import Room from 'components/Room';
import styled from 'styled-components';
import {Row, Col, Stack, Form} from 'react-bootstrap';
import {useState} from 'react';
import Button from 'components/common/Button/Button';
import {Children} from 'react';
import {gu} from 'constants/roomConstants';
import {useForm} from 'react-hook-form';
import {API_ROOMS, API_ROOMS_OPTIONS} from 'constants/apiUrls';
import useInterceptedAxios from 'hooks/useInterceptedAxios';

const RoomPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const jwtAxios = useInterceptedAxios();
  const [address, setAddress] = useState('상도동');

  const rooms0 = {
    price: '1000',
    rentType: '원룸',
    floor: '2',
    location: '동작구 상도1동',
  };
  const rooms1 = {
    price: '1000',
    rentType: '원룸',
    floor: '2',
    location: '동작구 상도2동',
  };
  const rooms2 = {
    price: '1000',
    rentType: '원룸',
    floor: '2',
    location: '동작구 상도3동',
  };
  const Rooms = [rooms0, rooms1, rooms2];
  const [show, setShow] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);

  const handleRoomClick = location => {
    setAddress(location);
  };

  const showFilter = () => setShow(true);
  const hideFilter = () => setShow(false);

  const handleFilter = async data => {
    const {gu, dong, airConditional, refrigerator, washingMachine, parking} =
      data;
    try {
      const response = await jwtAxios.get(API_ROOMS_OPTIONS, {
        params: {
          gu,
          dong,
          airConditional,
          refrigerator,
          washingMachine,
          parking,
        },
      });
      const data = response?.data;
      if (!data) {
        throw new Error('No Data');
      }
      setRooms(() => data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async data => {
    const {gu, dong} = data;
    console.log(gu, dong, page);
    try {
      const response = await jwtAxios.get(API_ROOMS, {
        params: {gu, dong, page: page - 1},
      });
      const data = response?.data;
      if (!data) {
        throw new Error('No Data');
      }
      setRooms(() => data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row>
        {/* 지도 */}
        <Col>
          <Room address={address}></Room>
        </Col>
        {/* 지도 컨트롤러 */}
        <Col sm={4}>
          <Stack direction="horizontal" className="d-flex align-items-center">
            {/* 매물 검색 */}
            <Form
              className="d-flex align-items-center gap-2 px-2 py-4"
              onSubmit={handleSubmit(handleSearch)}
            >
              <Form.Group controlId="formDong">
                <Form.Select
                  {...register('gu', {
                    required: true,
                  })}
                  isInvalid={!!errors['gu']}
                  style={{width: '8rem'}}
                >
                  {gu.map((value, index) => (
                    <option key={index}>{value}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formDong">
                <Form.Control
                  maxLength={10}
                  placeholder="xx동"
                  {...register('dong', {
                    required: true,
                  })}
                  isInvalid={!!errors['dong']}
                />
              </Form.Group>
              <Button
                style={{whiteSpace: 'nowrap'}}
                variant="primary"
                type="submit"
              >
                검색
              </Button>
              <Button
                style={{whiteSpace: 'nowrap'}}
                variant="secondary"
                onClick={showFilter}
              >
                필터링
              </Button>
            </Form>
          </Stack>
          <Stack>
            {Rooms.map((room, index) => (
              <div
                style={{
                  width: '100%',
                  height: '3rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid #a2a2a2',
                }}
                key={index}
                onClick={() => handleRoomClick(room.location)}
              >
                <span>{room.price}</span>
                <span>{room.rentType}</span>
                <span>{room.floor}</span>
                <span>{room.location}</span>
              </div>
            ))}
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default RoomPage;

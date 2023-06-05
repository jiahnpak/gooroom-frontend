import Room from 'components/Room';
import styled from 'styled-components';
import {Row, Col, Stack, Form, Modal} from 'react-bootstrap';
import {useState} from 'react';
import Button from 'components/common/Button/Button';
import {gu} from 'constants/roomConstants';
import {useForm} from 'react-hook-form';
import {API_ROOMS} from 'constants/apiUrls';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {SlLocationPin} from 'react-icons/sl';
import {formatPrice} from 'utils/mateUtils';

export const ResidenceComponent = ({residenceType}) => {
  let residenceLabel = '';
  console.log(residenceType);
  if (residenceType === 'ONE_ROOM') {
    residenceLabel = '원룸';
  } else if (residenceType === 'TWO_ROOM') {
    residenceLabel = '투룸';
  } else if (residenceType === 'APARTMENT') {
    residenceLabel = '아파트';
  } else if (residenceType === 'STUDIO') {
    residenceLabel = '오피스텔';
  }

  return <span>{residenceLabel}</span>;
};
const StyledRoomList = styled.div`
  overflow-y: scroll;
  height: 65vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RoomPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const jwtAxios = useInterceptedAxios();
  const [address, setAddress] = useState();

  const rooms0 = {
    price: '1000',
    rentType: 'WOLSE',
    location: '동작구 상도1동',
    deposit: 4000000,
    monthlyFee: 30000,
    residenceType: 'ONE_ROOM',

    floor: 2,
    houseSize: 40,
  };
  const rooms1 = {
    price: '1000',
    rentType: 'JEONSE',
    floor: '2',
    location: '동작구 상도2동',
    deposit: 4000000,
    monthlyFee: 30000,
    residenceType: 'TWO_ROOM',
  };
  const rooms2 = {
    price: '1000',
    rentType: '원룸',
    floor: 2,
    houseSize: 40,
    location: '동작구 상도3동',
    residenceType: 'APARTMENT',
    deposit: 4000000,
    monthlyFee: 30000,
    city: '서울시 동작구',
    dong: ' 상도동 ',
  };
  const rooms3 = {
    price: '1000',
    rentType: '원룸',
    floor: 2,
    houseSize: 40,
    location: '동작구 상도3동',
    residenceType: 'APARTMENT',
    deposit: 4000000,
    monthlyFee: 30000,
    city: '서울시 동작구',
    dong: ' 상도동 ',
  };
  const rooms4 = {
    price: '1000',
    rentType: '원룸',
    floor: 2,
    houseSize: 40,
    location: '동작구 상도3동',
    residenceType: 'APARTMENT',
    deposit: 4000000,
    monthlyFee: 30000,
    city: '서울시 동작구',
    dong: ' 상도동 ',
  };

  const Rooms = [rooms0, rooms1, rooms2, rooms3, rooms4];
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
      const response = await jwtAxios.get(API_ROOMS, {
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
              onSubmit={handleSubmit(handleFilter)}
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
              <Modal show={show} onHide={hideFilter}>
                <Modal.Header closeButton>
                  <Modal.Title>필터링</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(handleFilter)}>
                  <Modal.Body>
                    {/* 에어컨 */}
                    <Form.Group className="mb-3" controlId="formAirConditioner">
                      <Form.Label>에어컨</Form.Label>
                      <Form.Select
                        {...register('airConditional', {})}
                        isInvalid={!!errors['airConditional']}
                      >
                        <option value={null}>에어컨</option>
                        <option value={true}>O</option>
                        <option value={false}>X</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRefrigerator">
                      <Form.Label>냉장고</Form.Label>
                      <Form.Select
                        {...register('refrigerator', {})}
                        isInvalid={!!errors['refrigerator']}
                      >
                        <option value={null}>냉장고</option>
                        <option value={true}>O</option>
                        <option value={false}>X</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formWashingMachine">
                      <Form.Label>세탁기</Form.Label>
                      <Form.Select
                        {...register('washingMachine', {})}
                        isInvalid={!!errors['washingMachine']}
                      >
                        <option value={null}>세탁기</option>
                        <option value={true}>O</option>
                        <option value={false}>X</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formParking">
                      <Form.Label>주차장</Form.Label>
                      <Form.Select
                        {...register('parking', {})}
                        isInvalid={!!errors['parking']}
                      >
                        <option value={null}>주차장</option>
                        <option value={true}>O</option>
                        <option value={false}>X</option>
                      </Form.Select>
                    </Form.Group>
                  </Modal.Body>
                </Form>
              </Modal>
            </Form>
          </Stack>
          <StyledRoomList>
            {/* 매물 출력 */}
            {/* 서버 연결가능하면 Rooms.map -> rooms  */}
            {Rooms.map((room, index) => (
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #a2a2a2',
                  height: '6rem',
                }}
                key={index}
                onClick={() => handleRoomClick(room.location)}
              >
                <div
                  style={{
                    width: '30%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SlLocationPin fill="#6A5ACD" size="4em"></SlLocationPin>
                </div>
                <div>
                  <Row>
                    <h5 style={{marginTop: '10px'}}>
                      {room.rentType === 'WOLSE'
                        ? `월세 ${formatPrice(room.deposit)}/${formatPrice(
                            room.monthlyFee,
                          )}`
                        : `전세 ${formatPrice(room.deposit)}`}
                    </h5>
                  </Row>
                  <Row>
                    <span style={{display: 'inline-block'}}>
                      <ResidenceComponent residenceType="ONE_ROOM" />
                      {'  | '}
                      {room.floor}층 {'  | '}
                      {room.houseSize}
                    </span>
                  </Row>
                  <Row>
                    <span style={{fontSize: '15px'}}>
                      {room.city} {room.dong}
                    </span>
                  </Row>
                </div>
              </div>
            ))}
          </StyledRoomList>
        </Col>
      </Row>
    </>
  );
};

export default RoomPage;

import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import styled from 'styled-components';

const FilteringButton = styled.div`
  display: flex;
  width: 60%;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Filter = () => {
  const [show, setShow] = useState(false);
  const [filterOption, setFilterOption] = useState('');
  const [homeType, setHomeType] = useState();
  const [roomPrice, setRoomPrice] = useState();
  const [rentType, setRentType] = useState();
  const [address, setAddress] = useState();
  const [age, setAge] = useState();

  const showFilter = () => {
    setShow(true);
  };
  const closeFilter = () => {
    setShow(false);
  };

  const onFilter = () => {
    return <span>this is filter</span>;
  };

  const handleSubmit = event => {
    event.preventDefault();
    // 필터링 적용 함수를 호출합니다.
    onFilter(filterOption);
    // 모달을 닫습니다.
    closeFilter();
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <FilteringButton>
          <Button
            variant="primary"
            onClick={showFilter}
            style={{backgroundColor: '#6A5ACD', border: 'none'}}
          >
            게시글 필터
          </Button>
        </FilteringButton>
      </div>

      <Form onSubmit={handleSubmit}>
        <Modal show={show} onHide={closeFilter}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontFamily: 'Gill Sans'}}>필터링</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formHomeType">
                <Form.Label style={{marginTop: '5px'}}>월세/전세</Form.Label>
                <Form.Select
                  value={homeType}
                  onChange={event => setHomeType(event.target.value)}
                >
                  <option value={false}>월세</option>
                  <option value={true}>전세</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formRoomPrice">
                <Form.Label style={{marginTop: '10px'}}>가격대</Form.Label>
                <Form.Select
                  value={roomPrice}
                  onChange={event => setRoomPrice(event.target.value)}
                >
                  <option value="">가격대 선택 (관리비를 포함한 금액)</option>
                  <option value="30-">30만원 미만</option>
                  <option value="30-35">30-35만원</option>
                  <option value="35-40">35-40만원</option>
                  <option value="40-45">40-45만원</option>
                  <option value="45-50">45-50만원</option>
                  <option value="50-55">50-55만원</option>
                  <option value="55-60">55-60만원</option>
                  <option value="60+">60만원 이상</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formRentType">
                <Form.Label style={{marginTop: '10px'}}>주거 형태</Form.Label>
                <Form.Select
                  value={rentType}
                  onChange={event => setRentType(event.target.value)}
                >
                  <option value="oneRoom">원룸</option>
                  <option value="twoRoom">투룸</option>
                  <option value="efficiencyApartment">오피스텔</option>
                  <option value="apartment">아파트</option>
                  console.log({rentType});
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label style={{marginTop: '10px'}}>지역 선택</Form.Label>
                <Form.Select
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                >
                  <option value="">원하는 지역</option>
                  <option value="Sangdo">상도동</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formAge">
                <Form.Label style={{marginTop: '10px'}}>연령 선택</Form.Label>
                <Form.Select
                  value={age}
                  onChange={event => setAge(event.target.value)}
                >
                  <option value="20">20대 초</option>
                  <option value="23">20대 중</option>
                  <option value="27">20대 후</option>
                  <option value="30">30대 초</option>
                  <option value="33">30대 중</option>
                  <option value="37">30대 후</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{
                  margin: '10px',
                  fontSize: '1rem',
                  borderRadius: '15px',
                  backgroundColor: '#6A5ACD',
                  border: 'none',
                }}
              >
                닫기
              </Button>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{
                  margin: '10px',
                  fontSize: '1rem',
                  borderRadius: '15px',
                  backgroundColor: '#6A5ACD',
                  border: 'none',
                }}
              >
                적용
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Form>
    </>
  );
};

export default Filter;

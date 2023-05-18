import {Slider} from '@mui/material';
import {rentTypeFormat, residenceTypeFormat} from 'constants/mateEnum';
import {Col, Form, Row, Stack} from 'react-bootstrap';
import {Controller} from 'react-hook-form';
import {StyledMateForm} from './style';
import Button from 'components/common/Button/Button';

const MateForm = () => {
  return (
    <StyledMateForm>
      <Stack gap={4}>
        <Row gap={4} className="d-flex justify-content-center">
          <Col>
            <Form.Group controlId="formResidenceType">
              <Form.Label>주거 형태</Form.Label>
              <Form.Select>
                {Object.entries(residenceTypeFormat).map(
                  ([value, label], index) => (
                    <option key={index} value={value}>
                      {label}
                    </option>
                  ),
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formRentalType">
              <Form.Label>거래 유형</Form.Label>
              <Form.Select>
                {Object.entries(rentTypeFormat).map(([value, label], index) => (
                  <option key={index} value={value}>
                    {label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formRoomPrice">
          <Form.Label>가격</Form.Label>
          <Form.Control placeholder="가격을 입력해주세요" />
          {/* <Controller
          <Slider
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            disableSwap
            // scale={priceControl[currentRentType].scale}
            valueLabelDisplay="auto"
            // valueLabelFormat={formatPrice}
            // max={priceControl[currentRentType].max}
            step={1}
          />
          name="roomPrice"
          // control={control}
          // defaultValue={[0, priceMax]}
          render={({field}) => (
          )}
        /> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>집 주소 (상세주소 제외)</Form.Label>
          <Form.Control placeholder="집 주소를 입력해주세요" />
          {/* 
          String city,
          String dong,
          String roadName,
          String buildingNumber,
          String zipcode,
        */}
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label>게시글 내용</Form.Label>
          <Form.Control className="mb-2" placeholder="제목을 입력해주세요" />
          <Form.Control
            as="textarea"
            style={{height: '10rem', resize: 'none'}}
            placeholder="바라는 점, 원하는 룸메 유형 등을 자유롭게 작성해주세요."
          />
        </Form.Group>
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-end"
        >
          <Button variant="secondary">이미지 업로드</Button>
          <Button variant="primary" type="submit">
            등록
          </Button>
        </Stack>
      </Stack>
    </StyledMateForm>
  );
};

export default MateForm;

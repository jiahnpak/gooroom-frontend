import {
  contentMax,
  rentTypeFormat,
  residenceTypeFormat,
  titleMax,
} from 'constants/mateConstants';
import {Col, Form, Image, Row, Stack} from 'react-bootstrap';
import {StyledMateForm} from './style';
import Button from 'components/common/Button/Button';
import {priceMax} from 'constants/mateConstants';
import {priceStep} from 'constants/mateConstants';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validationSchema';
import {API_MATES} from 'constants/apiUrls';
import {useNavigate} from 'react-router-dom';
import {MATES} from 'constants/path';
import {useRef, useState} from 'react';
import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';

const MateForm = ({hasHome, modify}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      residenceType: modify?.mateInfo['residenceType'],
      rentType: modify?.mateInfo['rentType'],
      roomPrice: modify?.mateInfo['roomPrice'],
      address: modify?.mateInfo['city'],
      title: modify?.mateInfo['title'],
      content: modify?.mateInfo['content'],
    },
  });

  const showAlert = useAlert();
  const navigate = useNavigate();
  const axiosMultipart = useInterceptedAxios();

  const [roomImage, setRoomImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState(modify?.roomImage);

  // 방 사진 파일을 위한 input 태그를 가리키는 ref
  const fileInput = useRef(null);

  // 방 사진 업로드 버튼을 누를시 input[type="file"]을 대신 클릭하는 함수이다.
  const onClickFileInput = () => {
    fileInput.current.click();
  };

  // input[type="file"]로 사용자가 파일을 선택할 시 상태에 저장하는 함수이다.
  const onChangeFile = async e => {
    const file = e.target.files[0];
    const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    // 파일이 허가된 형식(.jpeg, .png)이 아니면 서버에 보내지 않는다.
    if (!allowedMimeTypes.includes(file.type)) {
      return;
    }

    setRoomImage(file);

    // 업로드한 방 사진을 미리보기 화면에 띄운다.
    // FileReader 객체를 이용하여 파일 데이터를 base64로 인코딩
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      // base64 데이터를 state에 저장
      setEncodedImage(prevImage => base64Image);
    };
  };

  // 게시글 제출 시 서버에 등록 요청을 보낸다.
  const onSubmit = async data => {
    const {residenceType, rentType, roomPrice, address, title, content} = data;

    const homePost = JSON.stringify({
      hasHome,
      postStatus: 'PROGRESS',
      residenceType,
      rentType,
      roomPrice,
      city: address,
      dong: address,
      roadName: address,
      buildingNumber: address,
      zipcode: address,
      title,
      content,
    });

    const homePostBlob = new Blob([homePost], {type: 'application/json'});

    const formData = new FormData();
    formData.append('homePost', homePostBlob);
    formData.append('file', roomImage);

    const url = !modify ? `${API_MATES}` : `${API_MATES}/${modify.postId}`;
    const method = !modify ? 'post' : 'patch';

    try {
      const response = await axiosMultipart({
        method: method,
        url: url,
        data: formData,
      });

      if (!response) {
        throw new Error('서버와 연결이 불안정합니다.');
      }

      navigate(MATES);
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;

      switch (errorCode) {
        default: // 기타 에러에 대한 처리
          showAlert(
            'danger',
            '서버와 연결이 불안정합니다. 잠시 후 시도해주세요.',
            2000,
          );
      }
    }
  };

  return (
    <StyledMateForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={4}>
        <Row gap={4} className="d-flex justify-content-center">
          <Col>
            <Form.Group controlId="formResidenceType">
              <Form.Label>주거 형태</Form.Label>
              <Form.Select
                {...register('residenceType')}
                isInvalid={!!errors['residenceType']}
              >
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
            <Form.Group controlId="formRentType">
              <Form.Label>거래 유형</Form.Label>
              <Form.Select
                {...register('rentType')}
                isInvalid={!!errors['rentType']}
              >
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
          <Form.Control
            type="number"
            min="0"
            max={priceMax}
            step={priceStep}
            placeholder="가격을 입력해주세요"
            {...register('roomPrice')}
            isInvalid={!!errors['roomPrice']}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>집 주소 (상세주소 제외)</Form.Label>
          <Form.Control
            placeholder="집 주소를 입력해주세요"
            {...register('address')}
            isInvalid={!!errors['address']}
          />
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label>게시글 내용</Form.Label>
          <Form.Control
            className="mb-2"
            placeholder="제목을 입력해주세요"
            maxLength={titleMax}
            {...register('title')}
            isInvalid={!!errors['title']}
          />
          <Form.Control
            as="textarea"
            style={{height: '10rem', resize: 'none'}}
            placeholder="바라는 점, 원하는 룸메 유형 등을 자유롭게 작성해주세요."
            maxLength={contentMax}
            {...register('content')}
            isInvalid={!!errors['content']}
          />
        </Form.Group>
        {encodedImage && <Image src={encodedImage} alt="방 사진" />}
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-end"
        >
          <Button variant="secondary" onClick={onClickFileInput}>
            이미지 업로드
          </Button>
          <input
            type="file"
            ref={fileInput}
            accept=".png, .jpeg, .jpg"
            onChange={onChangeFile}
            style={{display: 'none'}}
          />
          <Button variant="primary" type="submit">
            등록
          </Button>
        </Stack>
      </Stack>
    </StyledMateForm>
  );
};

export default MateForm;

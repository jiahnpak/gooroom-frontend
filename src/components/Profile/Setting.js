import Button from 'components/common/Button/Button';
import {nameMax, nameMin, pwdMax} from 'constants/memberConstants';
import {Col, Form, Image, Modal, Row} from 'react-bootstrap';
import {FaRegEdit} from 'react-icons/fa';
import {useRef} from 'react';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {profileSchema, withdrawalSchema} from './validationSchema';
import {
  StyledDescription,
  StyledForm,
  StyledSetting,
  StyledSettingBody,
  StyledSettingHead,
  StyledSettings,
} from './styles';
import {API_USERS, API_USERS_PROFILEIMAGE} from 'constants/apiUrls';
import {PROFILE_IMAGE} from 'constants/defaultValue';
import useAlert from 'hooks/useAlert';
import {useNavigate} from 'react-router-dom';
import {LOGOUT} from 'constants/path';

const Settings = ({memberMethods, profileImageMethods}) => {
  const jwtAxios = useInterceptedAxios();
  const {member, setMember} = memberMethods;
  const {profileImage, setProfileImage} = profileImageMethods;

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: {errors: profileErrors},
  } = useForm({
    defaultValues: {
      nickname: member.nickname,
      mobile: member.mobile,
    },
    resolver: yupResolver(profileSchema),
  });

  const {
    register: withdrawalRegister,
    handleSubmit: handleWithdrawalSubmit,
    formState: {errors: withdrawalErrors},
  } = useForm({
    resolver: yupResolver(withdrawalSchema),
  });

  const showAlert = useAlert();
  const navigate = useNavigate();

  // 프로필 이미지 파일을 위한 input 태그를 가리키는 ref
  const fileInput = useRef(null);

  // 계정 삭제 모달창이 열려있는지 여부를 저장
  const [withdrawModalShow, setWithdrawModalShow] = useState(false);

  const closeWithdrawModal = () => setWithdrawModalShow(false);
  const openWithdrawModal = () => setWithdrawModalShow(true);

  // 전화번호 인증 모달창이 열려있는지 여부를 저장
  const [mobileModalShow, setMobileModalShow] = useState(false);

  const closeMobileModal = () => setMobileModalShow(false);
  const openMobileModal = () => setMobileModalShow(true);

  /** TODO - 서버에 문자인증 요청 */
  const requestMobileAuth = () => {
    closeMobileModal();
  };

  /**
   * 프로필 수정에서 submit 이벤트 발생시 서버에 수정을 요청하는 함수이다.
   * @param {*} data - 프로필 수정에서 수집하는 데이터
   */
  const onSubmit = async data => {
    const {nickname, mobile} = data;
    const body = JSON.stringify({nickname, mobile});

    try {
      // 서버에 비동기로 수정 요청을 보낸다.
      const response = await jwtAxios.put(API_USERS, body);
      if (!response) {
        throw new Error('서버와 연결이 불안정합니다.');
      }

      // 에러가 없는 경우 profile 상태를 최신화시킨다.
      setMember(prevMember => ({
        ...prevMember,
        nickname,
        mobile,
      }));

      showAlert('success', '성공적으로 수정하였습니다.', 2000);
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

  /**
   * 프로필 수정에서 submit 이벤트 발생시 에러가 존재하는 경우 수행되는 함수이다.
   * @param {*} error - 프로필 수정에서 에러가 발생한 필드
   */
  const onInvalid = error => {};

  // 프로필 이미지 변경 버튼을 누를시 input[type="file"]을 대신 클릭하는 함수이다.
  const onClickFileInput = () => {
    fileInput.current.click();
  };

  // input[type="file"]로 사용자가 파일을 선택할 시 서버에 업로드하는 함수이다.
  const onChangeFile = async e => {
    const file = e.target.files[0];
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    // 파일이 허가된 형식(.jpeg, .png)이 아니면 서버에 보내지 않는다.
    if (!allowedMimeTypes.includes(file.type)) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const method = profileImage === PROFILE_IMAGE ? 'post' : 'patch';
      console.log(method);
      // 파일을 서버에 업로드한다.
      const response = await jwtAxios({
        method: method,
        url: API_USERS_PROFILEIMAGE,
        data: formData,
        headers: {
          ...jwtAxios.defaults.headers,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response) {
        throw new Error('서버와 연결이 불안정합니다.');
      }

      // 에러 코드가 없는 경우 profileImage 상태를 최신화한다.
      // FileReader 객체를 이용하여 파일 데이터를 base64로 인코딩
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result;
        // base64 데이터를 state에 저장
        setProfileImage(prevProfileImage => ({
          ...prevProfileImage,
          profileImage: base64Image,
        }));
      };

      showAlert('success', '성공적으로 수정하였습니다.', 2000);
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

  /**
   * 계정 삭제 버튼을 누를 시 수행되는 함수이다.
   */
  const onSubmitWithdrawal = async data => {
    const {checkPassword} = data;
    try {
      const response = await jwtAxios.delete(API_USERS, {
        data: {checkPassword},
      });
      if (!response) {
        throw new Error('계정 삭제 실패');
      }

      showAlert('success', '성공적으로 탈퇴되었습니다.', 2000);
      return navigate(LOGOUT);
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;

      switch (errorCode) {
        default: // 기타 에러에 대한 처리
          showAlert(
            'danger',
            '연결이 불안정합니다. 잠시 후 다시 시도해주세요.',
            2000,
          );
      }
    }
  };

  return (
    <>
      <StyledSettings>
        <StyledSetting>
          <StyledSettingHead>프로필 수정하기</StyledSettingHead>
          <StyledSettingBody>
            <Row className="gap-5">
              <Col sm={4}>
                {/* 프로필 수정하기 폼 */}
                <StyledForm
                  onSubmit={handleProfileSubmit(onSubmit, onInvalid)}
                  noValidate
                >
                  <Form.Group className="mb-5">
                    <Form.Label>닉네임</Form.Label>
                    <Form.Control
                      type="text"
                      minLength={nameMin}
                      maxLength={nameMax}
                      placeholder="닉네임을 입력해주세요."
                      isInvalid={!!profileErrors.nickname}
                      {...profileRegister('nickname')}
                    />
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label>전화번호</Form.Label>
                    <div className="d-grid">
                      <Button variant="secondary" onClick={openMobileModal}>
                        전화번호 인증하기
                      </Button>
                    </div>
                  </Form.Group>
                  <div className="d-grid">
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      style={{fontSize: '1rem'}}
                    >
                      수정하기
                    </Button>
                  </div>
                </StyledForm>
              </Col>
              <Col sm={4} className="ms-auto">
                {/* 프로필 사진 변경 폼 */}
                <Form>
                  <Form.Label className="d-block">프로필 사진</Form.Label>
                  <Form.Group className="position-relative">
                    <Image
                      src={profileImage}
                      width="192"
                      height="auto"
                      roundedCircle
                      onClick={onClickFileInput}
                      style={{cursor: 'pointer'}}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="d-flex align-items-center position-absolute start-0 bottom-0"
                      onClick={onClickFileInput}
                    >
                      <FaRegEdit className="me-1" /> 변경
                    </Button>
                    <input
                      type="file"
                      ref={fileInput}
                      accept=".png, .jpeg"
                      onChange={onChangeFile}
                      style={{display: 'none'}}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </StyledSettingBody>
        </StyledSetting>
        <StyledSetting>
          <StyledSettingHead color="danger">탈퇴하기</StyledSettingHead>
          <StyledSettingBody>
            <StyledDescription>
              삭제된 계정은 되돌릴 수 없습니다. 신중히 선택해주세요.
            </StyledDescription>
            <Button
              variant="danger"
              size="lg"
              onClick={openWithdrawModal}
              style={{
                fontSize: '1rem',
              }}
            >
              계정 삭제
            </Button>
            {/* 계정 삭제 모달 */}
            <Modal
              show={withdrawModalShow}
              onHide={closeWithdrawModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>정말로 삭제하시겠습니까?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  onSubmit={handleWithdrawalSubmit(onSubmitWithdrawal)}
                  noValidate
                >
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>비밀번호를 입력해주세요</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        maxLength={pwdMax}
                        isInvalid={!!withdrawalErrors.checkPassword}
                        {...withdrawalRegister('checkPassword')}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="danger"
                        size="lg"
                        type="submit"
                        style={{
                          fontSize: '1rem',
                          width: '100%',
                        }}
                      >
                        계정 삭제
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={closeWithdrawModal}
                        style={{
                          fontSize: '1rem',
                          width: '100%',
                        }}
                      >
                        취소하기
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </StyledSettingBody>
        </StyledSetting>
      </StyledSettings>
      {/* 전화번호 인증 모달 */}
      <Modal
        show={mobileModalShow}
        onHide={closeMobileModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>전화번호 인증</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="signupFormMobile">
            <Form.Label>전화번호</Form.Label>
            <Row className="align-items-center">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  isInvalid={!!profileErrors.mobile}
                  autoFocus
                  {...profileRegister('mobile')}
                />
              </Col>
              <Col sm="auto">
                <Button
                  variant="primary"
                  type="button"
                  onClick={requestMobileAuth}
                >
                  인증번호 받기
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Settings;

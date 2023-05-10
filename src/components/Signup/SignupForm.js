import {Col, Form, Modal, Row} from 'react-bootstrap';
import Button from 'components/common/Button';
import ModalButton from './ModalButton';
import {pwdMin, pwdMax, emailMax, nameMax, nameMin} from 'constants/validation';
import {useState} from 'react';
import useCheckAll from 'hooks/useCheckAll';

const SignupForm = ({formMethods, onSubmit, onInvalid}) => {
  // 회원가입 폼 관리를 위한 함수
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = formMethods;

  const termsList = [
    {id: 1, title: '이용약관 동의'},
    {id: 2, title: '개인정보 수집 및 동의'},
  ];
  // 약관 전체동의를 위한 커스텀 훅
  const [checkedList, onCheckAll, onCheckElement] = useCheckAll(termsList);

  // onCheckAll()은 각 체크박스에 change 이벤트를 발생시키지 않으므로
  // 직접 각 약관의 값을 변경한다.
  const handleCheckAll = checked => {
    onCheckAll(checked);
    termsList.forEach(terms => setValue(`terms${terms.id}`, checked));
  };

  // 전화번호 인증 모달창이 열려있는지 여부를 저장
  const [mobileModalShow, setMobileModalShow] = useState(false);

  const closeMobileModal = () => setMobileModalShow(false);
  const openMobileModal = () => setMobileModalShow(true);

  /** TODO - 서버에 문자인증 요청 */
  const requestMobileAuth = () => {
    closeMobileModal();
  };

  return (
    <>
      <Form
        className="mb-5 w-100"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
      >
        <Form.Group className="mb-5" controlId="signupFormEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력해주세요."
            maxLength={emailMax}
            isInvalid={!!errors.email}
            {...register('email')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5" controlId="signupFormPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            minLength={pwdMin}
            maxLength={pwdMax}
            placeholder={`영문자, 숫자, 특수문자를 포함한 ${pwdMin}~${pwdMax}자`}
            isInvalid={!!errors.password}
            {...register('password')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5" controlId="signupFormConfirm">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            maxLength={pwdMax}
            placeholder="비밀번호를 다시 입력해주세요."
            isInvalid={!!errors.confirm}
            {...register('confirm')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirm?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5" controlId="signupFormName">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="이름을 입력해주세요."
            minLength={nameMin}
            maxLength={nameMax}
            isInvalid={!!errors.name}
            {...register('name')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5" controlId="signupFormNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임을 입력해주세요."
            minLength={nameMin}
            maxLength={nameMax}
            isInvalid={!!errors.nickname}
            {...register('nickname')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nickname?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label className="d-block">성별</Form.Label>
          <Form.Check
            className="d-inline-flex me-5"
            id="signupFormMale"
            type="radio"
            value="MALE"
            label="남성"
            {...register('gender')}
          />
          <Form.Check
            className="d-inline-flex"
            id="signupFormFemale"
            type="radio"
            value="FEMALE"
            label="여성"
            {...register('gender')}
          />
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>생년월일</Form.Label>
          <Form.Control
            type="text"
            placeholder="생일을 입력해주세요."
            isInvalid={!!errors.birthdate}
            {...register('birthdate')}
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

        <Form.Group className="text-start" controlId="signupFormTermsAll">
          <Form.Check
            type="checkbox"
            label="전체 동의"
            checked={checkedList.length === termsList.length ? true : false}
            onChange={e => handleCheckAll(e.target.checked)}
          />
        </Form.Group>

        <hr />

        {termsList?.map(termsList => (
          <Form.Group
            className="mb-2"
            controlId={`signupFormTerms${termsList.id}`}
            key={termsList.id}
          >
            <Form.Check type="checkbox">
              <Form.Check.Input
                type="checkbox"
                {...register(`terms${termsList.id}`)}
                onChange={e => onCheckElement(e.target.checked, termsList.id)}
                checked={checkedList.includes(termsList.id) ? true : false}
              />
              <Form.Check.Label>{termsList.title}</Form.Check.Label>
              <Form.Text className="d-inline">
                <ModalButton>?</ModalButton>
              </Form.Text>
            </Form.Check>
          </Form.Group>
        ))}

        <div className="d-grid mt-3">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            style={{fontSize: '1rem'}}
          >
            시작하기
          </Button>
        </div>
      </Form>
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
                  isInvalid={!!errors.mobile}
                  autoFocus
                  {...register('mobile')}
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

export default SignupForm;

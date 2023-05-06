import {Col, Form, Modal, Row} from 'react-bootstrap';
import Button from 'components/common/Button';
import ModalButton from './ModalButton';
import {pwdMin, pwdMax} from './validationSchema';
import {useState} from 'react';

const SignupForm = ({formMethods, onSubmit, onInvalid}) => {
  // 체크박스 관리를 위한 state
  const [checkedList, setCheckedList] = useState([]);
  const termsList = [
    {id: 1, title: '이용약관 동의'},
    {id: 2, title: '개인정보 수집 및 동의'},
  ];

  /**
   * 전체선택 체크박스의 change 이벤트를 관리한다.
   * @param {boolean} checked - 체크 여부
   */
  const onCheckAll = checked => {
    if (checked) {
      // 전체선택 클릭 시 checkedList에 모든 약관의 id를 넣음
      const idArray = [];
      termsList.forEach(terms => idArray.push(terms.id));
      setCheckedList(idArray);
    } else {
      // 전체선택 해제 시 checkedList를 비움
      setCheckedList([]);
    }
    termsList.forEach(terms => setValue(`terms${terms.id}`, checked));
  };

  /**
   * 개별 체크박스의 change 이벤트를 관리한다.
   * @param {boolean} checked - 체크 여부
   * @param {number} id - 클릭된 체크박스의 termsList.id
   */
  const onCheckElement = (checked, id) => {
    if (checked) {
      // checkedList에 id를 추가
      setCheckedList(prev => [...prev, id]);
    } else {
      // checkedList에서 id를 삭제
      setCheckedList(checkedList.filter(el => el !== id));
    }
  };

  const [phoneModalShow, setPhoneModalShow] = useState(false);

  const closePhoneModal = () => setPhoneModalShow(false);
  const openPhoneModal = () => {
    setPhoneModalShow(true);
  };

  const requestAuthCode = () => {
    closePhoneModal();
    /** TODO - 서버에 문자인증 요청 */
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = formMethods;

  return (
    <>
      <Form
        className="mb-5"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
      >
        <Form.Group className="mb-5 text-start" controlId="signupFormEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력해주세요."
            isInvalid={!!errors.email}
            {...register('email')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5 text-start" controlId="signupFormPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder={`영문자, 숫자, 특수문자를 포함한 ${pwdMin}~${pwdMax}자`}
            isInvalid={!!errors.password}
            {...register('password')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5 text-start" controlId="signupFormConfirm">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            isInvalid={!!errors.confirm}
            {...register('confirm')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirm?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5 text-start" controlId="signupFormName">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="이름을 입력해주세요."
            isInvalid={!!errors.name}
            {...register('name')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5 text-start" controlId="signupFormNickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임을 입력해주세요."
            isInvalid={!!errors.nickname}
            {...register('nickname')}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nickname?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-5 text-start">
          <Form.Label>전화번호</Form.Label>
          <div className="d-grid">
            <Button variant="secondary" onClick={openPhoneModal}>
              전화번호 인증하기
            </Button>
          </div>
        </Form.Group>

        <Form.Group className="text-start" controlId="signupFormTermsAll">
          <Form.Check
            type="checkbox"
            label="전체 동의"
            checked={checkedList.length === termsList.length ? true : false}
            onChange={e => onCheckAll(e.target.checked)}
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
      <Modal show={phoneModalShow} onHide={closePhoneModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>전화번호 인증</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="signupFormPhonenumber">
            <Form.Label>전화번호</Form.Label>
            <Row className="align-items-center">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  isInvalid={!!errors.phonenumber}
                  autoFocus
                  {...register('phonenumber')}
                />
              </Col>
              <Col sm="auto">
                <Button
                  variant="primary"
                  type="button"
                  onClick={requestAuthCode}
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

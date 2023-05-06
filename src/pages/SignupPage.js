import {Form} from 'react-bootstrap';
import AuthForm from 'components/AuthForm';
import Button from 'components/common/Button';
import ModalButton from 'components/AuthForm/ModalButton';

const SignupPage = () => {
  return (
    <AuthForm title="간편 회원가입">
      <Form className="mb-5">
        <Form.Group className="mb-5 text-start">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일을 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-5 text-start">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="숫자와 영문자를 포함한 O~O자"
          />
        </Form.Group>

        <Form.Group className="mb-5 text-start">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </Form.Group>

        <Form.Group className="mb-5 text-start">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="이름을 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-5 text-start">
          <Form.Label>닉네임</Form.Label>
          <Form.Control type="text" placeholder="닉네임을 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-5 text-start">
          <Form.Label>전화번호</Form.Label>
          <div className="d-grid">
            <Button variant="secondary">전화번호 인증하기</Button>
          </div>
        </Form.Group>

        <Form.Group className="text-start" controlId="formCheckAll">
          <Form.Check type="checkbox" id="checkAll" label="전체 동의" />
        </Form.Group>

        <hr />

        <Form.Group className="mb-2" controlId="formCheckOption1">
          <Form.Check type="checkbox" id="check-option1">
            <Form.Check.Input type="checkbox" />
            <Form.Check.Label>이용약관 동의</Form.Check.Label>
            <Form.Text className="d-inline">
              <ModalButton>?</ModalButton>
            </Form.Text>
          </Form.Check>
        </Form.Group>

        <Form.Group className="mb-5" controlId="formCheckOption2">
          <Form.Check type="checkbox" id="check-option2">
            <Form.Check.Input type="checkbox" />
            <Form.Check.Label>개인정보 수집 및 동의</Form.Check.Label>
            <Form.Text className="d-inline">
              <ModalButton>?</ModalButton>
            </Form.Text>
          </Form.Check>
        </Form.Group>

        <div className="d-grid">
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
    </AuthForm>
  );
};

export default SignupPage;

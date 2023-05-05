import {Card, Form} from 'react-bootstrap';
import AuthForm from 'components/AuthForm';
import Button from 'components/common/Button/Button';
import Link from 'components/common/Link';

const LoginPage = () => {
  return (
    <AuthForm title="간편 로그인">
      <Form className="mb-5">
        <Form.Group className="mb-5 text-start">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일을 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-5 text-start">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
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

      <Card.Text className="mb-5 text-center">
        <Link to="/users/email">회원가입하기</Link>
      </Card.Text>
    </AuthForm>
  );
};

export default LoginPage;

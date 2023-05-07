import {Form} from 'react-bootstrap';
import Button from 'components/common/Button';

const LoginForm = ({formMethods, onSubmit, onInvalid}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = formMethods;

  return (
    <>
      <Form
        className="mb-5 w-100"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
      >
        <Form.Group className="mb-5">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력해주세요."
            isInvalid={!!errors.email}
            {...register('email')}
          />
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isInvalid={!!errors.password}
            {...register('password')}
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
    </>
  );
};

export default LoginForm;

import {Card} from 'react-bootstrap';
import AuthForm from 'components/common/AuthForm';
import Link from 'components/common/Link';
import LoginForm from './LoginForm';
import {useForm} from 'react-hook-form';
import {postLogin} from 'apis/auth';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validationSchema';
import {useAlert} from 'hooks/useAlert';
import {SIGNUP} from 'constants/path';
import CODE from 'constants/errorCode';
import {useSetRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';

const LoginEmail = ({title}) => {
  // 로그인 폼에서 필드의 값과 유효성 검증을 위해 사용
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate(); // 페이지 이동을 위해 사용

  const showAlert = useAlert(); // 알림 창 표시를 위한 훅

  const setAuth = useSetRecoilState(AuthState);

  /**
   * 로그인 폼에서 submit 이벤트가 발생하고 모든 필드가 유효한 경우 수행되는 함수이다.
   * @param {object} data - react-hook-form을 통해 관리하는 필드의 값이다.
   */
  const onSubmit = async data => {
    const {email, password} = data;
    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const response = await postLogin(body);

      const accessToken = response?.headers['Authorization'];

      if (!accessToken) {
        throw new Error('토큰 생성에 실패했습니다.');
      }

      setAuth({authenticated: true, accessToken: accessToken});

      return navigate('/');
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;

      switch (errorCode) {
        case CODE.LOGIN_FAILURE:
          showAlert(
            'danger',
            '이메일 또는 비밀번호를 잘못 입력했습니다.',
            2000,
          );
          break;
        default: // 기타 에러에 대한 처리
          showAlert(
            'danger',
            '로그인에 실패했습니다. 잠시 후 시도해주세요.',
            2000,
          );
      }
    }
  };

  const onInvalid = errors => {};

  return (
    <>
      <AuthForm title={title}>
        <LoginForm
          formMethods={formMethods}
          onSubmit={onSubmit}
          onInvalid={onInvalid}
        ></LoginForm>
        <Card.Text className="mb-5 text-center">
          <Link to={SIGNUP}>회원가입하기</Link>
        </Card.Text>
      </AuthForm>
    </>
  );
};

export default LoginEmail;

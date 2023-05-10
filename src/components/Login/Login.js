import {Card} from 'react-bootstrap';
import AuthForm from 'components/common/AuthForm';
import Link from 'components/common/Link';
import {LOGIN_EMAIL} from 'constants/path';
import kakaoLoginImg from 'assets/images/kakao_login_medium_wide.png';
import naverLoginImg from 'assets/images/naver_login_white.png';
import {API_LOGIN_KAKAO, API_LOGIN_NAVER} from 'constants/apiUrls';
import {FormFooter, IconContainer} from './styles';
import {FaEnvelope} from 'react-icons/fa';

const Login = ({title}) => {
  const onClickKakao = () => {
    // 카카오 로그인 API의 추가 항목 동의 받기를 위한 scope값. 변경 불가
    const additionalInfo = [
      'account_email',
      'name',
      'profile_nickname',
      'phone_number',
      'gender',
      'birthyear',
      'birthday',
    ];
    const KAKAO_AUTH_URL =
      `${API_LOGIN_KAKAO}&scope=` + additionalInfo.join(',');
    window.location.href = KAKAO_AUTH_URL;
  };

  const onClickNaver = () => {
    const STATE_STRING = Math.random().toString(36).substring(2);
    const NAVER_AUTH_URL = `${API_LOGIN_NAVER}&state=${STATE_STRING}`;
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <>
      <AuthForm title={title}>
        <img
          height="50"
          src={naverLoginImg}
          alt="/"
          onClick={onClickNaver}
          style={{cursor: 'pointer'}}
        />
        <FormFooter>
          다른 방법도 있어요!
          <Link to={LOGIN_EMAIL}>
            <IconContainer>
              <FaEnvelope />
            </IconContainer>
          </Link>
        </FormFooter>
      </AuthForm>
    </>
  );
};

export default Login;

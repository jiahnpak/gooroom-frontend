import {Card} from 'react-bootstrap';
import AuthForm from 'components/common/AuthForm';
import Link from 'components/common/Link';
import {LOGIN_EMAIL} from 'constants/path';
import kakaoLoginImg from 'assets/images/kakao_login_medium_wide.png';
import {API_LOGIN_KAKAO} from 'constants/apiUrls';

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

  return (
    <>
      <AuthForm title={title}>
        <a href onClick={onClickKakao}>
          <img src={kakaoLoginImg} alt="" />
        </a>
        <Card.Text className="mb-5 text-center">
          다른 방법도 있어요!
          <Link to={LOGIN_EMAIL}>이메일</Link>
        </Card.Text>
      </AuthForm>
    </>
  );
};

export default Login;

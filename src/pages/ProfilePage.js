import Profile from 'components/Profile';

const {LOGIN} = require('constants/path');
const {default: useAlert} = require('hooks/useAlert');
const {default: useAuthState} = require('hooks/useAuth');
const {useEffect} = require('react');
const {useNavigate} = require('react-router-dom');

const ProfilePage = () => {
  const authState = useAuthState();
  const showAlert = useAlert();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authState['authenticated']) {
  //     showAlert(
  //       'warning',
  //       '인증이 필요한 서비스입니다. 로그인 후 이용해주세요.',
  //       2000,
  //     );
  //     navigate(LOGIN);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authState]);
  return <Profile></Profile>;
};

export default ProfilePage;

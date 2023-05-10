import Profile from 'components/Profile';
import useAuthRedirect from 'hooks/useAuthRedirect';

const ProfilePage = () => {
  // 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
  // useAuthRedirect();

  return <Profile></Profile>;
};

export default ProfilePage;

import Profile from 'components/Profile';
import Loading from 'components/common/Loading/Loading';
import CODE from 'constants/errorCode';
import {LOGIN} from 'constants/path';
import useMember from 'hooks/useMember';
import {useEffect} from 'react';
import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import UnexpectedPage from './UnexpectedPage';

const ProfilePage = () => {
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const memberMethods = useMember();
  const {getMember} = memberMethods;

  useEffect(() => {
    const getDatas = async () => {
      const response = await getMember();

      switch (response) {
        case CODE.INVALIDATE_TOKEN:
          setIsLoggedIn(false);
          break;
        case CODE.UNEXPECTED:
          setUnexpectedError(true);
          break;
        default:
      }

      setLoading(false);
    };
    getDatas();
  }, []);

  if (unexpectedError) {
    return <UnexpectedPage />;
  }

  // 서버에서 데이터를 가져오는 중에는 로딩화면 렌더링
  if (loading) {
    return <Loading />;
  }

  // 로그인 하지 않은 사용자인 경우 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to={LOGIN} replace={true} />;
  }

  return <Profile memberMethods={memberMethods}></Profile>;
};

export default ProfilePage;

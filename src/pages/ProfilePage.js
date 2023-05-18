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

  const memberMethods = useMember();
  const {getMember} = memberMethods;

  useEffect(() => {
    const getDatas = async () => {
      const response = await getMember();

      switch (response) {
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

  return <Profile memberMethods={memberMethods}></Profile>;
};

export default ProfilePage;

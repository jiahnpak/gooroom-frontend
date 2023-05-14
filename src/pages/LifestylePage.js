import Lifestyle from 'components/Lifestyle/Lifestyle';
import Section from 'components/common/Section/Section';
import useLifestyle from 'hooks/useLifestyle';
import useMember from 'hooks/useMember';
import useProfileImage from 'hooks/useProfileImage';
import {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import {useState} from 'react';
import Loading from 'components/common/Loading/Loading';
import CODE from 'constants/errorCode';
import {LOGIN, USERS_LIFESTYLE} from 'constants/path';

const LifestylePage = () => {
  const title = '나는 이런 사람이에요!';
  const {nickname} = useParams();

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasLifestyle, setHasLifestyle] = useState(true);

  const {member, getMember} = useMember(); // 닉네임으로 Member 찾기 필요
  const {member: loginMember, getMember: getLoginMember} = useMember(); // 현재 로그인 중인 사용자의 정보
  const {lifestyle, getLifestyle} = useLifestyle(); // 지정된 닉네임을 가진 사용자의 기본 정보 및 성향 정보
  const {profileImage, getProfileImage} = useProfileImage(); // 지정된 닉네임을 가진 사용자의 프로필 이미지

  // 컴포넌트가 마운트될 때 지정된 닉네임을 가진 사용자 생활 패턴을 서버에게 받아온다.
  useEffect(() => {
    const getDatas = async () => {
      await getMember();

      const loginMemberCode = await getLoginMember();
      const lifestyleCode = await getLifestyle(nickname);
      await getProfileImage(nickname);

      // 로그인 중인 사용자가 아닌 경우
      if (loginMemberCode === CODE.NOT_FOUND_MEMBER) {
        setIsLoggedIn(false);
      }

      // lifestyle이 없는 경우
      if (lifestyleCode === CODE.NOT_FOUND_MEMBER) {
        setHasLifestyle(false);
      }

      setLoading(false);
    };
    getDatas();
  }, [nickname]);

  // 서버에서 데이터를 가져오는 중에는 로딩화면 렌더링
  if (loading) {
    return <Loading />;
  }

  // 로그인 하지 않은 사용자인 경우 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to={LOGIN} replace={true} />;
  }

  if (!hasLifestyle) {
    // 1. 이 페이지 주인이 로그인 사용자이면 작성페이지로 이동
    if (nickname === loginMember?.nickname) {
      return <Navigate to={USERS_LIFESTYLE} replace={true} />;
    }
    // 2. 이 페이지 주인이 다른 사람이면 Not Found 랜더링
    else {
      return <NotFoundPage />;
    }
  }

  return (
    <>
      <Section title={title}>
        <Lifestyle
          nickname={nickname}
          member={member}
          loginMember={loginMember}
          lifestyle={lifestyle}
          profileImage={profileImage}
        ></Lifestyle>
      </Section>
    </>
  );
};

export default LifestylePage;

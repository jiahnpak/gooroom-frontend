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
import {LOGIN, MATELIST_POSTED, USERS_LIFESTYLE} from 'constants/path';
import UnexpectedPage from './UnexpectedPage';
import {MATE_PROFILE_IMAGE, ROOM_IMAGE} from 'constants/defaultValue';
import MatePosted from 'components/MatePosted/MatePosted';
//
const MatePostedPage = () => {
  const title = '룸메 구하기';
  const {nickname} = useParams();

  // const [unexpectedError, setUnexpectedError] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  const {profileImage, getProfileImage} = useProfileImage(); // 지정된 닉네임을 가진 사용자의 프로필 이미지

  const matePosted = {
    profileImage: MATE_PROFILE_IMAGE, // 프로필 이미지
    roomImage: ROOM_IMAGE, // 방 사진
    nickname: '존윅', // 닉네임
    title: '상도동에서 같이 사실 분을 구합니다.', // 게시글 제목
    hasHome: true, // 게시글 종류 (집 O / 집 X)
    postStatus: '완료', // 진행 상태
    residenceType: '원룸', // 주거 형태
    rentType: '월세', // 월세/전세
    roomPrice: 250000, // 가격
    address: '상도동 좋은빌라',
    age: '20대 중반',
    // 소개글
    content:
      '안녕하세요? 상도동 좋은빌라에서 같이 동거하실 분을 찾습니다. 축구 좋아하는 분이셨으면 좋겠어요.',
  };

  // if (unexpectedError) {
  //   return <UnexpectedPage />;
  // }

  // 서버에서 데이터를 가져오는 중에는 로딩화면 렌더링
  // if (loading) {
  //   return <Loading />;
  // }

  // 로그인 하지 않은 사용자인 경우 로그인 페이지로 리다이렉트
  // if (!isLoggedIn) {
  //   return <Navigate to={LOGIN} replace={true} />;
  // }

  // if (!hasLifestyle) {
  //   // 1. 이 페이지 주인이 로그인 사용자이면 작성페이지로 이동
  //   if (nickname === loginMember?.nickname) {
  //     return <Navigate to={USERS_LIFESTYLE} replace={true} />;
  //   }
  //   // 2. 이 페이지 주인이 다른 사람이면 Not Found 랜더링
  //   else {
  //     return <NotFoundPage />;
  //   }
  // }

  return (
    <>
      <Section title={title}>
        <MatePosted matePosted={matePosted}></MatePosted>
      </Section>
    </>
  );
};

export default MatePostedPage;

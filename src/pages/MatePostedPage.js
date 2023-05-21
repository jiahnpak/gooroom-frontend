import Section from 'components/common/Section/Section';
import useMember from 'hooks/useMember';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import {useState} from 'react';
import Loading from 'components/common/Loading/Loading';
import CODE from 'constants/errorCode';
import UnexpectedPage from './UnexpectedPage';

import MatePosted from 'components/MatePosted/MatePosted';
import useMatePosted from 'hooks/useMatePosted';

const MatePostedPage = () => {
  const title = '룸메 구하기';
  const {postId} = useParams();

  const [unexpectedError, setUnexpectedError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const {member: loginMember, getMember: getLoginMember} = useMember(); // 현재 로그인 중인 사용자의 정보
  const {
    mateInfo,
    profileImage,
    roomImage,
    setMateInfo,
    getMateInfo,
    getProfileImage,
    getRoomImage,
  } = useMatePosted();

  // 컴포넌트가 마운트될 때 지정된 닉네임을 가진 사용자 생활 패턴을 서버에게 받아온다.
  useEffect(() => {
    const getDatas = async () => {
      const loginMemberCode = await getLoginMember();
      switch (loginMemberCode) {
        case CODE.UNEXPECTED:
          setUnexpectedError(true);
          break;
        default:
      }

      const mateInfoCode = await getMateInfo(postId);
      switch (mateInfoCode) {
        case CODE.NOT_FOUND:
          setNotFound(true);
          break;
        case CODE.UNEXPECTED:
          setUnexpectedError(true);
          break;
        default:
      }

      const profileImageCode = await getProfileImage(postId);
      switch (profileImageCode) {
        case CODE.UNEXPECTED:
          setUnexpectedError(true);
          break;
        default:
      }

      const roomImageCode = await getRoomImage(postId);
      switch (roomImageCode) {
        case CODE.UNEXPECTED:
          setUnexpectedError(true);
          break;
        default:
      }

      setLoading(false);
    };
    getDatas();
  }, [postId]);

  if (unexpectedError) {
    return <UnexpectedPage />;
  }

  // 서버에서 데이터를 가져오는 중에는 로딩화면 렌더링
  if (loading) {
    return <Loading />;
  }

  // 게시글 정보가 없다면 Not Found 화면 렌더링
  if (notFound) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Section title={title}>
        <MatePosted
          postId={postId}
          mateInfo={mateInfo}
          setMateInfo={setMateInfo}
          profileImage={profileImage}
          roomImage={roomImage}
          isWriter={mateInfo.nickname === loginMember.nickname}
        ></MatePosted>
      </Section>
    </>
  );
};

export default MatePostedPage;

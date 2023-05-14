import {useEffect} from 'react';
import {Image} from 'react-bootstrap';
import {
  StyledProfile,
  StyledProfileName,
  StyledProfileNameBlock,
  StyledProfileNickname,
} from './styles';
import Tabs from 'components/common/Tabs';
import {useNavigate} from 'react-router-dom';
import {USERS_LIFESTYLE} from 'constants/path';
import PersonalPosts from './PersonalPosts';
import Settings from './Setting';
import FavoritePosts from './FavoritePosts';
import useProfileImage from 'hooks/useProfileImage';

const Profile = ({memberMethods}) => {
  const profileImageMethods = useProfileImage();

  const {member} = memberMethods;
  const {profileImage, getProfileImage} = profileImageMethods;

  const navigate = useNavigate();

  // 마이페이지 탭 목록
  const tabList = [
    {id: 0, title: '내 글 보기'},
    {id: 1, title: '계정 관리'},
    {id: 2, title: '찜 목록'},
  ];

  // 마이페이지 탭 우측 버튼
  const tabButton = {
    title: '나는 이런 사람이에요',
    onClick: () => {
      navigate(`${USERS_LIFESTYLE}/${member.nickname}`);
    },
  };

  // 컴포넌트가 마운트될 때 로그인 중인 사용자의 프로필을 서버에게 받아온다.
  useEffect(() => {
    getProfileImage(member.nickname);
  }, []);

  return (
    <StyledProfile>
      <Image roundedCircle width="128" height="auto" src={profileImage} />
      <StyledProfileNameBlock>
        <StyledProfileName>{member.name}</StyledProfileName>
        <StyledProfileNickname>({member.nickname})</StyledProfileNickname>
      </StyledProfileNameBlock>
      <Tabs tabList={tabList} tabButton={tabButton}>
        <PersonalPosts />
        <Settings
          memberMethods={memberMethods}
          profileImageMethods={profileImageMethods}
        />
        <FavoritePosts />
      </Tabs>
    </StyledProfile>
  );
};

export default Profile;

import {API_USERS, API_USERS_PROFILEIMAGE} from 'constants/apiUrls';
import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {useReducer} from 'react';
import {useEffect} from 'react';
import {Image} from 'react-bootstrap';
import {StyledProfile, StyledProfileName} from './styles';
import Tabs from 'components/common/Tabs';
import {useNavigate} from 'react-router-dom';
import {USERS_LIFESTYLE} from 'constants/path';
import PersonalPosts from './PersonalPosts';
import Settings from './Setting';
import FavoritePosts from './FavoritePosts';
import {PROFILE_IMAGE} from 'constants/defaultValue';

const initialProfile = {
  member: {
    name: '룸메즈',
    nickname: 'gooroom',
    email: 'gooroom@soongsil.ac.kr',
    mobile: '010-1234-5678',
    gender: 'MALE',
    birthyear: '2000',
    birthday: '01-01',
  },
  profileImage: {
    encoded: PROFILE_IMAGE,
  },
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_MEMBER':
      return {
        ...state,
        ...action.member,
      };
    case 'UPDATE_IMAGE':
      return {
        ...state,
        profileImage: {
          encoded: action.file,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const Profile = () => {
  const jwtAxios = useInterceptedAxios();
  const showAlert = useAlert();
  const navigate = useNavigate();

  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    initialProfile,
  );

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
      navigate(`${USERS_LIFESTYLE}/${profileState.nickname}`);
    },
  };

  // 컴포넌트가 마운트될 때 로그인 중인 사용자의 프로필을 서버에게 받아온다.
  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await jwtAxios.get(API_USERS);
        const data = JSON.parse(response?.data || '{}');

        const {name, nickname, email, mobile, gender, birthyear, birthday} =
          data;

        const member = {
          name,
          nickname,
          email,
          mobile,
          gender,
          birthyear,
          birthday,
        };

        if (data) {
          profileDispatch({type: 'UPDATE_MEMBER', member: member});
        }
      } catch (err) {
        showAlert('danger', '페이지를 로드할 수 없습니다.', 3000);
      }
    };
    const getImage = async () => {
      try {
        const response = await jwtAxios.get(API_USERS_PROFILEIMAGE, {
          responseType: 'arraybuffer',
        });
        const imageData = response?.data?.file;

        if (imageData) {
          const base64Image = Buffer.from(imageData, 'binary').toString(
            'base64',
          );
          profileDispatch({
            type: 'UPDATE_IMAGE',
            file: `data:image/png;base64,${base64Image}`,
          });
        }
      } catch (err) {}
    };
    getMember();
    getImage();
  }, [jwtAxios]);

  return (
    <StyledProfile>
      <Image
        roundedCircle
        width="128"
        height="auto"
        src={profileState.profileImage.encoded}
      />
      <StyledProfileName>{profileState.member.name}</StyledProfileName>
      <Tabs tabList={tabList} tabButton={tabButton}>
        <PersonalPosts />
        <Settings
          profileState={profileState}
          profileDispatch={profileDispatch}
        />
        <FavoritePosts />
      </Tabs>
    </StyledProfile>
  );
};

export default Profile;

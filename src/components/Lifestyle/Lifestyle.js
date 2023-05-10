import {useMember} from 'contexts/MemberContext';
import {useProfileImage} from 'contexts/ProfileImageContext';
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useLifestyle} from 'contexts/LifestyleContext';
import {
  StyledLifestyle,
  StyledLifestyleBottom,
  StyledLifestyleTitle,
  StyledLifestyleTop,
  StyledParagraph,
  StyledProfileInfo,
  StyledProfileMeta,
  StyledProfileName,
} from './styles';
import {Col, Image, Row} from 'react-bootstrap';
import {
  cleanupType,
  drinkingType,
  organizeType,
  sleepingHabitType,
  smokingType,
  wakeupTime,
} from 'constants/lifestyleList';
import Button from 'components/common/Button/Button';

const Lifestyle = () => {
  const {nickname} = useParams();

  const member = useMember(nickname); // 닉네임으로 Member 찾기 필요
  const profileImage = useProfileImage(nickname);
  const lifestyle = useLifestyle(nickname);

  const loginMember = useMember(); // 현재 로그인 중인 사용자의 정보

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    member: {...member},
    profileImage: profileImage,
    lifestyle: {...lifestyle},
  });

  // 컴포넌트가 마운트될 때 지정된 닉네임을 가진 사용자 생활 패턴을 서버에게 받아온다.
  useEffect(() => {
    setProfile({member: {...member}, profileImage, lifestyle: {...lifestyle}});
  }, [member, profileImage, lifestyle]);

  const onClickModifyBtn = () => {
    // "나는 이런 사람이에요!"의 수정 페이지로 이동
  };

  return (
    <StyledLifestyle>
      <StyledLifestyleTop>
        <StyledProfileInfo xs="auto">
          <Col>
            <Image
              roundedCircle
              width="72"
              height="auto"
              src={profile.profileImage}
            />
          </Col>
          <Col>
            <StyledProfileName>{profile.member.name}</StyledProfileName>
            <StyledProfileMeta>
              {profile.member.gender &&
                `성별: ${
                  profile.member.gender === 'MALE'
                    ? '남자 '
                    : profile.member.gender === 'FEMALE'
                    ? '여자 '
                    : ''
                }`}{' '}
              {profile.member.birthyear &&
                `연령대: ${profile.member.birthyear}`}
            </StyledProfileMeta>
          </Col>
          {nickname === loginMember.nickname && (
            <Col className="ms-auto">
              <Button variant="secondary" onClick={onClickModifyBtn}>
                수정
              </Button>
            </Col>
          )}
        </StyledProfileInfo>
        <Row xs="auto">
          <StyledParagraph>{profile.lifestyle.introduce}</StyledParagraph>
        </Row>
      </StyledLifestyleTop>
      <StyledLifestyleBottom>
        <Row>
          <Col>
            <StyledLifestyleTitle>흡연</StyledLifestyleTitle>
            <StyledParagraph>
              {profile.lifestyle.smokingType && smokingType.placeholder}
            </StyledParagraph>
          </Col>
          <Col>
            <StyledLifestyleTitle>음주</StyledLifestyleTitle>
            <StyledParagraph>
              {profile.lifestyle.drinkingType &&
                drinkingType.options.find(
                  option => option.value === profile.lifestyle.drinkingType,
                ).label}
            </StyledParagraph>
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledLifestyleTitle>잠버릇</StyledLifestyleTitle>
            <StyledParagraph>
              {profile.lifestyle.sleepingHabitType &&
                sleepingHabitType.placeholder}
            </StyledParagraph>
            <StyledParagraph>
              {profile.lifestyle.wakeupTime &&
                wakeupTime.options.find(
                  option => option.value === profile.lifestyle.wakeupTime,
                ).label}
            </StyledParagraph>
          </Col>
          <Col>
            <StyledLifestyleTitle>청결</StyledLifestyleTitle>
            <StyledParagraph>
              {profile.lifestyle.organizeType &&
                organizeType.options.find(
                  option => option.value === profile.lifestyle.organizeType,
                ).label}
            </StyledParagraph>
            <StyledParagraph>
              {profile.lifestyle.cleanupType &&
                cleanupType.options.find(
                  option => option.value === profile.lifestyle.cleanupType,
                ).label}
            </StyledParagraph>
          </Col>
        </Row>
      </StyledLifestyleBottom>
    </StyledLifestyle>
  );
};

export default Lifestyle;

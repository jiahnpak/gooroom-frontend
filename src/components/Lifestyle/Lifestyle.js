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
  wakeupType,
} from 'constants/lifestyleList';
import Button from 'components/common/Button/Button';
import {useNavigate} from 'react-router-dom';
import {USERS_LIFESTYLE} from 'constants/path';
import {formatAgeGroup} from 'utils/mateUtils';

const Lifestyle = ({nickname, loginMember, lifestyle, profileImage}) => {
  const navigate = useNavigate();

  const onClickModifyBtn = () => {
    // "나는 이런 사람이에요!"의 수정 페이지로 이동
    navigate(`${USERS_LIFESTYLE}`, {state: lifestyle});
  };

  return (
    <StyledLifestyle>
      <StyledLifestyleTop>
        <StyledProfileInfo xs="auto">
          <Col>
            <Image roundedCircle width="72" height="auto" src={profileImage} />
          </Col>
          <Col>
            <StyledProfileName>{lifestyle.name}</StyledProfileName>
            <StyledProfileMeta>
              <span>
                {lifestyle.gender &&
                  `성별: ${
                    lifestyle.gender === 'M'
                      ? '남자 '
                      : lifestyle.gender === 'F'
                      ? '여자 '
                      : ''
                  }`}
              </span>
              <span>
                {lifestyle.age && `연령대: ${formatAgeGroup(lifestyle.age)}`}
              </span>
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
          <StyledParagraph>{lifestyle.introduce}</StyledParagraph>
        </Row>
      </StyledLifestyleTop>
      <StyledLifestyleBottom>
        <Row>
          <Col>
            <StyledLifestyleTitle>흡연</StyledLifestyleTitle>
            <StyledParagraph>
              {lifestyle.smokingType && smokingType.placeholder}
            </StyledParagraph>
          </Col>
          <Col>
            <StyledLifestyleTitle>음주</StyledLifestyleTitle>
            <StyledParagraph>
              {lifestyle.drinkingType &&
                drinkingType.options.find(
                  option => option.value === lifestyle.drinkingType,
                ).label}
            </StyledParagraph>
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledLifestyleTitle>잠버릇</StyledLifestyleTitle>
            <StyledParagraph>
              {lifestyle.sleepingHabitType && sleepingHabitType.placeholder}
            </StyledParagraph>
            <StyledParagraph>
              {lifestyle.wakeupType &&
                wakeupType.options.find(
                  option => option.value === lifestyle.wakeupType,
                ).label}
            </StyledParagraph>
          </Col>
          <Col>
            <StyledLifestyleTitle>청결</StyledLifestyleTitle>
            <StyledParagraph>
              {lifestyle.organizeType &&
                organizeType.options.find(
                  option => option.value === lifestyle.organizeType,
                ).label}
            </StyledParagraph>
            <StyledParagraph>
              {lifestyle.cleanupType &&
                cleanupType.options.find(
                  option => option.value === lifestyle.cleanupType,
                ).label}
            </StyledParagraph>
          </Col>
        </Row>
      </StyledLifestyleBottom>
    </StyledLifestyle>
  );
};

export default Lifestyle;

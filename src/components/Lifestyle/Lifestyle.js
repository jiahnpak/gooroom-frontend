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

const Lifestyle = ({
  nickname,
  member,
  loginMember,
  lifestyle,
  profileImage,
}) => {
  const onClickModifyBtn = () => {
    // "나는 이런 사람이에요!"의 수정 페이지로 이동
  };

  return (
    <StyledLifestyle>
      <StyledLifestyleTop>
        <StyledProfileInfo xs="auto">
          <Col>
            <Image roundedCircle width="72" height="auto" src={profileImage} />
          </Col>
          <Col>
            <StyledProfileName>{member.name}</StyledProfileName>
            <StyledProfileMeta>
              {member.gender &&
                `성별: ${
                  member.gender === 'M'
                    ? '남자 '
                    : member.gender === 'F'
                    ? '여자 '
                    : ''
                }`}{' '}
              {member.birthyear && `연령대: ${member.birthyear}`}
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
              {lifestyle.wakeupTime &&
                wakeupTime.options.find(
                  option => option.value === lifestyle.wakeupTime,
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

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import {Image, Stack} from 'react-bootstrap';
import Button from 'components/common/Button/Button';
import {
  hasHomeFormat,
  rentTypeFormat,
  residenceTypeFormat,
} from 'constants/mateConstants';
import {
  formatAgeGroup,
  formatDifferenceInTimes,
  formatPrice,
} from 'utils/mateUtils';
import {postStatusFormat} from 'constants/mateConstants';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {parseISO} from 'date-fns';

const DefaultDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  word-wrap: break-word;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

const StyledMatePostedController = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const PostedDescriptionSpan = styled.span`
  color: #000000;
`;

const PostedMetadata = styled(Stack)`
  color: #a2a2a2;
`;

const MatePosted = ({mateInfo, profileImage, roomImage}) => {
  return (
    <>
      <Form style={{width: '70%'}}>
        <Row>
          <HeaderDiv>
            <Col xs="auto">
              <Image
                roundedCircle
                src={profileImage}
                fluid
                thumbnail
                width="64"
                height="auto"
              ></Image>
            </Col>
            <Col>
              <DefaultDiv>
                <span>{mateInfo.nickname}</span>
              </DefaultDiv>
              <DefaultDiv>
                <span>{formatAgeGroup(mateInfo.age)}</span>
              </DefaultDiv>
            </Col>
            <Button variant="secondary" style={{marginRight: '10px'}}>
              나는 이런 사람이에요
            </Button>
          </HeaderDiv>
          <hr style={{marginTop: '10px'}}></hr>
        </Row>
        {/* 게시글 정보 */}
        <PostedMetadata gap={2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{fontSize: '1.25rem', color: '#000000'}}>
              {mateInfo.title}
            </h3>
            <Button
              variant={
                mateInfo?.postStatus !== 'COMPLETE' ? 'primary' : 'secondary'
              }
            >
              {postStatusFormat[mateInfo?.postStatus]}
            </Button>
          </div>
          <Stack direction="horizontal" gap={2}>
            <span>{hasHomeFormat[mateInfo.hasHome]}</span>
            <span>
              {formatDifferenceInTimes(
                new Date(),
                parseISO(mateInfo.lastEditTime),
              )}
            </span>
          </Stack>

          <Stack direction="horizontal" gap={2}>
            <PostedDescriptionSpan>
              {residenceTypeFormat[mateInfo?.residenceType]}
            </PostedDescriptionSpan>
            <PostedDescriptionSpan>|</PostedDescriptionSpan>
            <PostedDescriptionSpan>
              {rentTypeFormat[mateInfo?.rentType]}
            </PostedDescriptionSpan>
            <PostedDescriptionSpan>
              {formatPrice(mateInfo.roomPrice)}
            </PostedDescriptionSpan>
          </Stack>
          <Stack direction="horizontal" gap={1}>
            <span>{mateInfo?.city}</span>
            <span>{mateInfo?.roadName}</span>
            <span>{mateInfo?.buildingNumber}</span>
            <span>{mateInfo?.zipcode}</span>
          </Stack>
        </PostedMetadata>

        <DefaultDiv style={{marginTop: '10px'}}>
          <p>{mateInfo.content}</p>
        </DefaultDiv>
        {roomImage && (
          <DefaultDiv style={{width: '100%'}}>
            <Image src={roomImage} fluid></Image>
          </DefaultDiv>
        )}
        <Row>
          <StyledMatePostedController>
            <DefaultDiv style={{marginRight: '10px'}}>
              <Button
                variant={mateInfo.postMark ? 'primary' : 'secondary'}
                className="d-flex align-items-center gap-1"
              >
                {mateInfo.postMark ? <FaHeart /> : <FaRegHeart />}
                <span>찜하기</span>
              </Button>
            </DefaultDiv>
            <DefaultDiv style={{marginRight: '10px'}}>
              <Button variant="secondary">수정</Button>
            </DefaultDiv>
            <DefaultDiv style={{marginRight: '10px'}}>
              <Button variant="danger">삭제</Button>
            </DefaultDiv>
            <DefaultDiv>
              <Button variant="primary">목록</Button>
            </DefaultDiv>
          </StyledMatePostedController>
        </Row>
      </Form>
    </>
  );
};

export default MatePosted;

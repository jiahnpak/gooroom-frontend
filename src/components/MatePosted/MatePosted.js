import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import {Image, Stack} from 'react-bootstrap';
import Header from 'components/common/Layout/Header';
import Button from 'components/common/Button/Button';

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

const MatePosted = ({matePosted}) => {
  return (
    <>
      <Form style={{width: '70%'}}>
        <Row>
          <HeaderDiv>
            <Col xs="auto">
              <Image
                roundedCircle
                src={matePosted.profileImage}
                fluid
                thumbnail
                width="64"
                height="auto"
              ></Image>
            </Col>
            <Col>
              <DefaultDiv>
                <span>{matePosted.nickname}</span>
              </DefaultDiv>
              <DefaultDiv>
                <span>{matePosted.age}</span>
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
              {matePosted.title}
            </h3>
            {matePosted.postStatus === '진행 중' ||
            matePosted.postStatus === '협의 중' ? (
              <Button variant="primary">{matePosted.postStatus}</Button>
            ) : (
              <Button variant="secondary">{matePosted.postStatus}</Button>
            )}
          </div>
          <span>{matePosted.hasHome ? '집 O' : '집 X'}</span>

          <Stack direction="horizontal" gap={2}>
            <PostedDescriptionSpan>
              {matePosted.residenceType}
            </PostedDescriptionSpan>
            <PostedDescriptionSpan>|</PostedDescriptionSpan>
            <PostedDescriptionSpan>{matePosted.rentType}</PostedDescriptionSpan>
            <PostedDescriptionSpan>
              {matePosted.roomPrice}
            </PostedDescriptionSpan>
          </Stack>
          <DefaultDiv>
            <span>{matePosted.address}</span>
          </DefaultDiv>
        </PostedMetadata>

        <DefaultDiv style={{marginTop: '10px'}}>
          <p>{matePosted.content}</p>
        </DefaultDiv>
        <DefaultDiv style={{width: '100%'}}>
          <Image src={matePosted.roomImage} fluid></Image>
        </DefaultDiv>
        <Row>
          <StyledMatePostedController>
            <DefaultDiv style={{marginRight: '10px'}}>
              <Button variant="secondary">찜하기</Button>
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

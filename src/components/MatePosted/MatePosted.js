import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import {Image, Modal, Stack} from 'react-bootstrap';
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
import {useNavigate} from 'react-router-dom';
import {MATES, USERS_LIFESTYLE} from 'constants/path';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {API_MARK_MATES, API_MATES} from 'constants/apiUrls';
import useAlert from 'hooks/useAlert';
import {useState} from 'react';
import Dropdown from 'components/common/Dropdown/Dropdown';
import DropdownItem from 'components/common/Dropdown/DropdownItem';
import KakaoMap from './KaKaoMap';

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

const MatePosted = ({
  postId,
  mateInfo,
  setMateInfo,
  profileImage,
  roomImage,
  isWriter,
}) => {
  const jwtAxios = useInterceptedAxios();

  const showAlert = useAlert();
  const navigate = useNavigate();

  const [removalVisible, setRemovalVisible] = useState(false);

  const address = [
    mateInfo?.city,
    mateInfo?.roadName,
    mateInfo?.buildingNumber,
  ].join(' ');

  /**
   * 작성자의 '나는 이런 사람이에요' 페이지로 이동시키는 함수이다.
   */
  const navigateLifestyle = () =>
    navigate(`${USERS_LIFESTYLE}/${mateInfo.nickname}`);

  /**
   * 게시글 상태를 변경시키는 함수이다.
   */
  const onChangeStatus = async eventKey => {
    const homePost = JSON.stringify({
      ...mateInfo,
      postStatus: eventKey,
    });
    const homePostBlob = new Blob([homePost], {type: 'application/json'});

    const formData = new FormData();
    formData.append('homePost', homePostBlob);

    try {
      const response = await jwtAxios({
        method: 'patch',
        url: `${API_MATES}/${postId}`,
        data: formData,
      });

      if (!response) {
        throw new Error('서버와 연결이 불안정합니다.');
      }

      navigate(0);
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;

      switch (errorCode) {
        default: // 기타 에러에 대한 처리
          showAlert(
            'danger',
            '서버와 연결이 불안정합니다. 잠시 후 시도해주세요.',
            2000,
          );
      }
    }
  };

  /**
   * 서버에 현재 게시글을 찜 목록에 추가하도록 요청하는 함수이다.
   */
  const onMark = async () => {
    if (mateInfo.postmark) {
      // 이미 찜한 경우 취소 불가
      return;
    }

    try {
      await jwtAxios.post(`${API_MARK_MATES}/${postId}`);
      setMateInfo(prev => ({...prev, postmark: true}));
    } catch (err) {
      showAlert(
        'danger',
        '서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요.',
        2000,
      );
    }
  };

  /**
   * 현재 게시글의 수정 페이지로 이동시키는 함수이다.
   */
  const onClickModify = () =>
    navigate(`${MATES}/new`, {state: {postId, mateInfo, roomImage}});

  /** 게시글 삭제 모달을 화면에 보이게 하는 함수이다. */
  const showRemovalModal = () => setRemovalVisible(true);
  /** 게시글 삭제 모달을 화면에서 숨기는 함수이다. */
  const hideRemovalModal = () => setRemovalVisible(false);

  /**
   * 현재 게시글을 삭제하는 함수이다.
   */
  const onRemove = async () => {
    try {
      await jwtAxios.delete(`${MATES}/${postId}`);
    } catch (err) {
      showAlert(
        'danger',
        '서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요.',
        2000,
      );
    }
  };

  /**
   * 게시글 목록 페이지로 이동시키는 함수이다.
   */
  const onClickList = () => navigate(MATES);

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
                style={{cursor: 'pointer'}}
                onClick={navigateLifestyle}
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
            <Button
              variant="secondary"
              style={{marginRight: '10px'}}
              onClick={navigateLifestyle}
            >
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
            {/* 게시글 제목 */}
            <h3 style={{fontSize: '1.25rem', color: '#000000'}}>
              {mateInfo.title}
            </h3>
            {/* 게시글 상태 */}
            {mateInfo?.postStatus === 'COMPLETE' ? (
              <Button variant={'secondary'}>
                {postStatusFormat[mateInfo?.postStatus]}
              </Button>
            ) : !isWriter ? (
              <Button variant={'primary'}>
                {postStatusFormat[mateInfo?.postStatus]}
              </Button>
            ) : (
              <Dropdown
                title={postStatusFormat[mateInfo?.postStatus]}
                variant="primary"
                onSelect={onChangeStatus}
              >
                <DropdownItem
                  eventKey="PROGRESS"
                  active={mateInfo?.postStatus === 'PROGRESS'}
                >
                  {postStatusFormat['PROGRESS']}
                </DropdownItem>
                <DropdownItem
                  eventKey="DISCUSSION"
                  active={mateInfo?.postStatus === 'DISCUSSION'}
                >
                  {postStatusFormat['DISCUSSION']}
                </DropdownItem>
                <DropdownItem
                  eventKey="COMPLETE"
                  active={mateInfo?.postStatus === 'COMPLETE'}
                >
                  {postStatusFormat['COMPLETE']}
                </DropdownItem>
              </Dropdown>
            )}
          </div>

          <Stack direction="horizontal" gap={2}>
            {/* 게시글 유형 집 O/X */}
            <span>{hasHomeFormat[mateInfo.hasHome]}</span>
            {/* 마지막 수정으로부터 지난 시간 */}
            <span>
              {formatDifferenceInTimes(
                new Date(),
                parseISO(mateInfo.lastEditTime),
              )}
            </span>
          </Stack>

          <Stack direction="horizontal" gap={2}>
            {/* 거주 유형 */}
            <PostedDescriptionSpan>
              {residenceTypeFormat[mateInfo?.residenceType]}
            </PostedDescriptionSpan>
            <PostedDescriptionSpan>|</PostedDescriptionSpan>
            {/* 월/전세 */}
            <PostedDescriptionSpan>
              {rentTypeFormat[mateInfo?.rentType]}
            </PostedDescriptionSpan>
            {/* 가격 */}
            <PostedDescriptionSpan>
              {formatPrice(mateInfo.roomPrice)}
            </PostedDescriptionSpan>
          </Stack>

          {/* 주소 */}
          <Stack direction="horizontal" gap={1}>
            <span>{mateInfo?.city}</span>
            <span>{mateInfo?.roadName}</span>
            <span>{mateInfo?.buildingNumber}</span>
          </Stack>
        </PostedMetadata>

        {/* 게시글 본문 */}
        <DefaultDiv style={{marginTop: '10px'}}>
          <p>{mateInfo.content}</p>
        </DefaultDiv>
        {/* 방 사진 */}
        {roomImage && (
          <DefaultDiv style={{width: '100%'}}>
            <Image src={roomImage} fluid></Image>
          </DefaultDiv>
        )}

        {mateInfo.hasHome && <KakaoMap address={address} />}

        {/* 게시글 버튼 그룹 */}
        <Row>
          <StyledMatePostedController>
            <DefaultDiv style={{marginRight: '10px'}}>
              <Button
                variant={mateInfo.postmark ? 'primary' : 'secondary'}
                className="d-flex align-items-center gap-1"
                onClick={onMark}
              >
                {mateInfo.postmark ? <FaHeart /> : <FaRegHeart />}
                <span>찜하기</span>
              </Button>
            </DefaultDiv>
            {isWriter && (
              <>
                <DefaultDiv style={{marginRight: '10px'}}>
                  <Button variant="secondary" onClick={onClickModify}>
                    수정
                  </Button>
                </DefaultDiv>
                <DefaultDiv style={{marginRight: '10px'}}>
                  <Button variant="danger" onClick={showRemovalModal}>
                    삭제
                  </Button>
                </DefaultDiv>
                <Modal show={removalVisible} onHide={hideRemovalModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>정말로 삭제하시겠습니까?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={onRemove}
                          size="lg"
                          style={{fontSize: '1rem'}}
                          className="w-100"
                        >
                          글 삭제
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="primary"
                          onClick={hideRemovalModal}
                          size="lg"
                          style={{fontSize: '1rem'}}
                          className="w-100"
                        >
                          취소하기
                        </Button>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
              </>
            )}
            <DefaultDiv>
              <Button variant="primary" onClick={onClickList}>
                목록
              </Button>
            </DefaultDiv>
          </StyledMatePostedController>
        </Row>
      </Form>
    </>
  );
};

export default MatePosted;

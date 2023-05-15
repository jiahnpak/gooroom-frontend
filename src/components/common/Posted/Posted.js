import React from 'react';
import styled, {css} from 'styled-components';

//import MateList from 'components/MateList/MateList';

export const FilteringButton = styled.div`
  display: flex;
  width: 60%;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MainBody = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  margin: 10px 40px 0 40px;
  height: 5rem;
  width: 60%;
  border: none;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const LeftSide = styled.div`
  flex: 1;
  margin-left: 20px;
  width: 50%;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
`;

const RightSideTexts = styled.p`
  margin-left: 15px;
  font-size: 15px;
`;
const LeftSideTexts = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
`;
const StyledPostedInfoRight = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PostedInfoLeft = ({mates}) => {
  return (
    <>
      <p>{mates.title}</p>
      <LeftSideTexts>
        {mates.birthyear}
        <span style={{paddingRight: '20px'}}></span>
        {mates.postStatus}
      </LeftSideTexts>
    </>
  );
};

const PostedInfoRight = ({mates}) => {
  return (
    <StyledPostedInfoRight>
      <RightSideTexts>{mates.address}</RightSideTexts>
      <RightSideTexts>{mates.homeType}</RightSideTexts>
      <RightSideTexts>{mates.roomPrice}</RightSideTexts>
      <RightSideTexts>{mates.rentType}</RightSideTexts>
    </StyledPostedInfoRight>
  );
};

const Posted = ({children, mates}) => {
  const {title, birthyear, postStatus, ...rest} = mates || {};
  const leftMates = {title, birthyear, postStatus};
  const rightMates = {...rest};
  return (
    <>
      <MainBody>
        <Container>
          <LeftSide>
            <PostedInfoLeft mates={leftMates}></PostedInfoLeft>
          </LeftSide>
          <RightSide>
            <RightSideTexts>
              <PostedInfoRight mates={rightMates}>{children}</PostedInfoRight>
            </RightSideTexts>
          </RightSide>
        </Container>
      </MainBody>
    </>
  );
};

export default Posted;

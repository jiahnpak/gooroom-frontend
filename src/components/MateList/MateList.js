import WithoutHome from './WithoutHome';
import WithHome from './WithHome';
import styled, {css} from 'styled-components';
import Button from '../common/Button/Button';
import {useEffect, useState} from 'react';
import Filter from 'components/common/Posted/Filter';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const MateList = () => {
  const [activeButton, setActiveButton] = useState('button1');

  const handleClick = buttonName => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <div
        style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}
      >
        <h2>룸메 구하기</h2>
      </div>

      <ButtonWrapper>
        <Button
          variant={activeButton === 'button1' ? 'primary' : 'secondary'}
          size="lg"
          type="submit"
          style={{margin: '10px', fontSize: '1rem', borderRadius: '15px'}}
          onClick={() => handleClick('button1')}
        >
          거주 중인 집이 있어요
        </Button>
        <Button
          variant={activeButton === 'button2' ? 'primary' : 'secondary'}
          size="lg"
          type="submit"
          style={{
            margin: '10px',
            borderRadius: '15px',
            fontSize: '1rem',
          }}
          onClick={() => handleClick('button2')}
        >
          같이 집 구해요
        </Button>
      </ButtonWrapper>
      <Filter></Filter>
      {activeButton === 'button1' ? (
        <WithHome />
      ) : activeButton === 'button2' ? (
        <WithoutHome />
      ) : null}
    </>
  );
};

export default MateList;

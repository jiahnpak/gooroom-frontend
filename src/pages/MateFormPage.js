import MateForm from 'components/MateForm/MateForm';
import {ButtonWrapper} from 'components/MateList/styles';
import Button from 'components/common/Button/Button';
import Section from 'components/common/Section/Section';
import {useState} from 'react';

const MateFormPage = () => {
  const title = '룸메 구하기 - 글쓰기';
  const [activeButton, setActiveButton] = useState('button1');

  // 룸메이트 게시글 탭을 누르면 게시글 작성 폼을 변경
  const onTabClick = buttonName => {
    setActiveButton(buttonName);
    // dispatchFilter({type: 'MOVE_TAB', hasHome: buttonName === 'button1'});
  };

  return (
    <Section title={title}>
      {/* 룸메이트 게시글 탭 */}
      <ButtonWrapper>
        <Button
          variant={activeButton === 'button1' ? 'primary' : 'secondary'}
          size="lg"
          style={{margin: '10px', fontSize: '1rem', borderRadius: '15px'}}
          onClick={() => onTabClick('button1')}
        >
          거주 중인 집이 있어요
        </Button>
        <Button
          variant={activeButton === 'button2' ? 'primary' : 'secondary'}
          size="lg"
          style={{
            margin: '10px',
            borderRadius: '15px',
            fontSize: '1rem',
          }}
          onClick={() => onTabClick('button2')}
        >
          같이 집 구해요
        </Button>
      </ButtonWrapper>
      <MateForm hasHome={activeButton === 'button1'} />
    </Section>
  );
};

export default MateFormPage;

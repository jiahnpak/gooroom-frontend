import MateForm from 'components/MateForm/MateForm';
import {ButtonWrapper} from 'components/MateList/styles';
import Button from 'components/common/Button/Button';
import Section from 'components/common/Section/Section';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

const MateFormPage = () => {
  const title = '룸메 구하기 - 글쓰기';
  const {state} = useLocation();

  const isModifyPage = !!state;
  const [hasHome, setHasHome] = useState(
    isModifyPage ? state?.mateInfo['hasHome'] : true,
  );

  // 룸메이트 게시글 탭을 누르면 게시글 작성 폼을 변경
  const onTabClick = hasHome => {
    setHasHome(hasHome);
  };

  return (
    <Section title={title}>
      {/* 룸메이트 게시글 탭 */}
      <ButtonWrapper>
        <Button
          variant={hasHome ? 'primary' : 'secondary'}
          size="lg"
          style={{margin: '10px', fontSize: '1rem', borderRadius: '15px'}}
          onClick={() => onTabClick(true)}
          disabled={isModifyPage}
        >
          거주 중인 집이 있어요
        </Button>
        <Button
          variant={!hasHome ? 'primary' : 'secondary'}
          size="lg"
          style={{
            margin: '10px',
            borderRadius: '15px',
            fontSize: '1rem',
          }}
          onClick={() => onTabClick(false)}
          disabled={isModifyPage}
        >
          같이 집 구해요
        </Button>
      </ButtonWrapper>
      <MateForm hasHome={hasHome} modify={state} />
    </Section>
  );
};

export default MateFormPage;

import {Carousel} from 'react-bootstrap';
import styled from 'styled-components';

const StyledHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 40vh;

  background: #373940;
  color: white;
`;

const UnexpectedPage = () => {
  return (
    <>
      <Carousel slide={false} controls={false} touch={false}>
        <Carousel.Item>
          <StyledHero></StyledHero>
          <Carousel.Caption>
            <h3>Unexpected Error :(</h3>
            <p style={{whiteSpace: 'pre-line'}}>
              예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.{'\n'}
              이 오류가 반복해서 나타날 경우 문의해 주세요.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default UnexpectedPage;

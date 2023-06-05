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

const NotFoundPage = () => {
  return (
    <>
      <Carousel slide={false} controls={false} touch={false}>
        <Carousel.Item>
          <StyledHero></StyledHero>
          <Carousel.Caption>
            <h3>404 Not Found</h3>
            <p>주소가 올바른지 다시 한번 확인해주세요.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default NotFoundPage;

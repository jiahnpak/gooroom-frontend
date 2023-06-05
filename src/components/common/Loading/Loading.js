import {Spinner} from 'react-bootstrap';
import styled from 'styled-components';

const StyledLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  width: 100vw;
  height: 100vh;

  background: #ffffffb7;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
`;

const StyledDescription = styled.p`
  font-size: 1rem;
`;

const Loading = ({title, description}) => {
  return (
    <StyledLoading>
      {title && <StyledTitle>{title}</StyledTitle>}
      {description && <StyledDescription>{description}</StyledDescription>}
      <Spinner animation="border" />
    </StyledLoading>
  );
};

export default Loading;

import styled from 'styled-components';

const StyledModalButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 1rem;
  height: 1rem;
  color: ${({theme}) => theme.colors.white};
  background: ${({theme}) => theme.colors.lightgray};
  border: none;
  border-radius: 50%;

  cursor: pointer;
  margin-left: 0.3rem;
`;

const ModalButton = ({children}) => {
  return <StyledModalButton>{children}</StyledModalButton>;
};

export default ModalButton;

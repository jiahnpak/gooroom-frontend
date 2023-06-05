import {Form} from 'react-bootstrap';
import {styled} from 'styled-components';

export const StyledMateForm = styled(Form)`
  min-width: 25rem;
  width: 35%;
  height: 55vh;
  padding: 2rem 2.5rem;
  margin-bottom: 3rem;

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 5px 5px 20px;

  overflow-y: scroll;
  // 스크롤바 숨기기 (크롬, 사파리, 오페라, 엣지)
  &::-webkit-scrollbar {
    display: none;
  }
`;

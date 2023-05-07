const {Form} = require('react-bootstrap');
const {default: styled} = require('styled-components');

export const StyledForm = styled(Form)`
  margin-bottom: 3rem;
`;

export const StyledFormItemPositioner = styled.div`
  display: grid;
  grid-template-rows: repeat(3, minmax(9rem, auto));
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem;
`;

export const StyledFormItem = styled.div`
  // 마지막 기타 항목은 두 개의 칸을 차지하도록 한다.
  &:last-of-type {
    grid-column: 1 / span 2;
  }

  & > hr {
    width: 100%;
    align-self: end;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }

  display: grid;
  grid-template-columns: repeat(autofill, auto);
  height: 100%;
`;

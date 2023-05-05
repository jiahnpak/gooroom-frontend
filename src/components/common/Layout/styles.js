import styled from 'styled-components';

const StyledBrandName = styled.div`
  width: 126px;

  font-family: 'BrandNameFont';
  font-size: 16px;

  display: flex;
  align-items: center;

  color: #000000;
`;

export const BrandName = ({children}) => {
  return <StyledBrandName>{children}</StyledBrandName>;
};

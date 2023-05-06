import styled from 'styled-components';

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2.5rem;
  margin-top: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const StyledSectionTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: #000000;
`;

export const StyledSectionDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({theme}) => theme.colors.lightgray};
`;

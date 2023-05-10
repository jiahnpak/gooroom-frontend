import {Card, Row} from 'react-bootstrap';
import styled from 'styled-components';

export const StyledLifestyle = styled(Card)`
  min-width: 30rem;
  max-width: 32rem;
  background: #ffffff;
  margin-bottom: 3rem;
`;

export const StyledLifestyleTop = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
  padding: 1.25rem 2.5rem;
`;

export const StyledProfileInfo = styled(Row)`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1.25rem;
`;

export const StyledProfileName = styled(Row)`
  font-size: 1rem;
  color: '#000000';
`;

export const StyledProfileMeta = styled(Row)`
  font-size: 0.75rem;
  color: ${({theme}) => theme.colors.textDefault};
`;

export const StyledParagraph = styled.p`
  font-size: 1rem;
  color: ${({theme}) => theme.colors.textDefault};
  word-break: break-all;
`;

export const StyledLifestyleBottom = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  padding: 1.25rem 2.5rem;
`;

export const StyledLifestyleTitle = styled.h4`
  font-size: 1.125rem;
  display: block;
`;

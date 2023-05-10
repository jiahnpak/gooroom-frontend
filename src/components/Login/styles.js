import {Card} from 'react-bootstrap';
import styled from 'styled-components';

export const FormFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1.25rem;

  margin-top: 3rem;
  margin-bottom: 2rem;

  color: ${({theme}) => theme.colors.lightgray};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: min-content;
  height: auto;
  padding: 0.75rem;

  border: 1px solid ${({theme}) => theme.colors.secondaryBtnBorder};
  border-radius: 0.75rem;
`;

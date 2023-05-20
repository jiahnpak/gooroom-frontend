import {ListGroup, Stack} from 'react-bootstrap';
import styled from 'styled-components';

export const StyledMateListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  min-width: 45%;
  max-width: 70%;
  width: max-content;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MateListItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({theme}) => theme.colors.lightgray};

  cursor: pointer;
`;

export const ListItemLeft = styled(Stack)`
  overflow: hidden;
  white-space: nowrap;

  margin-right: 1rem;
`;

export const ListItemTitle = styled.h4`
  font-size: 1rem;

  color: ${({theme}) => theme.colors.textDefault};
`;

export const ListItemMeta = styled(Stack)`
  font-size: 0.8rem;
`;

export const ListItemRight = styled(Stack)`
  white-space: nowrap;

  display: flex;
  justify-content: flex-end;

  width: 50%;

  background: #ffffff;
`;

export const ListItemAddress = styled.div`
  overflow: hidden;
`;

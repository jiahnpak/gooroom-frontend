import {Pagination} from 'react-bootstrap';
import {styled} from 'styled-components';

export const StyledPaginationItem = styled(Pagination.Item)`
  & > * {
    width: 3.2rem;
    height: 4rem;
    color: ${({theme}) => theme.colors.textDefault};

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
  }

  & > a {
    &:hover {
      background: #f5f5f5;
      color: ${({theme}) => theme.colors.textDefault};
    }
  }

  &.page-item.active .page-link {
    background: ${({theme}) => theme.colors.primary};
  }
`;

export const StyledPagination = styled(Pagination)``;

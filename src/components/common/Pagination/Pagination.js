import {useState} from 'react';
import {StyledPagination, StyledPaginationItem} from './styles';

const Pagination = ({totalPosts, onPageChange}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalPosts / 10);

  const onClick = changedPage => {
    setPage(changedPage);
    onPageChange(changedPage);
  };

  const renderPageNav = () => {
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <StyledPaginationItem
          key={i}
          active={page === i}
          onClick={() => onClick(i)}
        >
          {i}
        </StyledPaginationItem>,
      );
    }
    return pageNumbers;
  };

  return (
    <StyledPagination>
      {page > 10 && (
        <StyledPaginationItem onClick={() => onClick(1)}>
          {'«'}
        </StyledPaginationItem>
      )}
      {renderPageNav()}
      {page < totalPages && (
        <StyledPaginationItem onClick={() => onClick(totalPages)}>
          {'»'}
        </StyledPaginationItem>
      )}
    </StyledPagination>
  );
};

export default Pagination;

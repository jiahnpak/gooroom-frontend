import {useState} from 'react';
import {Pagination} from 'react-bootstrap';

const PageNav = ({totalMates, dispatchFilter}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalMates / 10);

  const onPageChange = changedPage => {
    setPage(changedPage);
    dispatchFilter({type: 'MOVE_PAGE', page: changedPage});
  };

  const renderPageNav = () => {
    let startPage = Math.max(1, page - 5);
    let endPage = Math.min(totalPages, startPage + 9);

    if (endPage - startPage < 9) {
      startPage = Math.max(1, endPage - 9);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={page === i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }
    return pageNumbers;
  };

  return (
    <Pagination>
      {page > 10 && <Pagination.First onClick={() => onPageChange(1)} />}
      {renderPageNav()}
      {page < totalPages && (
        <Pagination.Last onClick={() => onPageChange(totalPages)} />
      )}
    </Pagination>
  );
};

export default PageNav;

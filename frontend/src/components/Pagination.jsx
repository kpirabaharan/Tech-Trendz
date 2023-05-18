import { Link } from 'react-router-dom';

import { usePagination, DOTS } from '../hooks/usePagination';
import { LeftChevron } from '../icons/LeftChevron';
import { RightChevron } from '../icons/RightChevron';

const Pagination = (props) => {
  const {
    mode,
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul>
      <div className='flex flex-row gap-4 justify-center'>
        <li
          className='cursor-pointer'
          onClick={currentPage !== 1 ? () => onPrevious() : () => {}}
        >
          <Link
            to={
              currentPage !== 1
                ? `/?mode=${mode}&page=${currentPage - 1}`
                : `/?mode=${mode}&page=${currentPage}`
            }
          >
            <LeftChevron />
          </Link>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className='cursor-pointer'>
                &#8230;
              </li>
            );
          }
          return (
            <li
              key={index}
              className={`cursor-pointer ${
                currentPage === pageNumber ? 'text-blue-500' : ''
              }`}
            >
              <Link
                to={`/?mode=${mode}&page=${pageNumber}`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Link>
            </li>
          );
        })}
        <li
          className='cursor-pointer'
          onClick={currentPage !== lastPage ? () => onNext() : () => {}}
        >
          <Link
            to={
              currentPage !== lastPage
                ? `/?mode=${mode}&page=${currentPage + 1}`
                : `/?mode=${mode}&page=${currentPage}`
            }
          >
            <RightChevron />
          </Link>
        </li>
      </div>
    </ul>
  );
};

export default Pagination;

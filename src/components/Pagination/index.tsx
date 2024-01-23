import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import styles from '../Pagination/Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      className={styles.root}
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;

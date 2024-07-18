import { FC } from "react";
import styles from "./Pagination.module.scss";
import usePagination from "../../hooks/usePagination";

type Props = {
  totalPageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

const Pagination: FC<Props> = (props) => {
  const paginationRange = usePagination({
    totalPageCount: props.totalPageCount,
    currentPage: props.currentPage,
    siblingCount: props.siblingCount,
  });
  const lastPage = paginationRange[paginationRange.length - 1];
  const DOTS = -1;

  if (props.currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    props.onPageChange(props.currentPage + 1);
  };

  const onPrevious = () => {
    props.onPageChange(props.currentPage - 1);
  };

  return (
    <ul className={styles.paginationContainer}>
      <li
        className={`${styles.paginationItem} ${props.currentPage === 1 ? styles.disabled : ""}`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>

      {paginationRange.map((pageNumber, index) => {
        return pageNumber === DOTS ? (
          <li
            className={`${styles.paginationItem} ${styles.dots}`}
            key={"dots-" + index}
          >
            &#8230;
          </li>
        ) : (
          <li
            className={`${styles.paginationItem} ${pageNumber === props.currentPage ? styles.selected : ""}`}
            key={"page-" + index}
            onClick={() => props.onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={`${styles.paginationItem} ${lastPage === props.currentPage ? styles.disabled : ""}`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} data-testid="next" />
      </li>
    </ul>
  );
};

export default Pagination;

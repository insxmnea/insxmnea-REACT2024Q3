import { FC } from "react";
import styles from "./Pagination.module.scss";
import usePagination from "../../hooks/usePagination";
import classNames from "classnames";

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
        className={classNames(styles.paginationItem, {
          [styles.disabled]: props.currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className={classNames(styles.arrow, styles.left)} />
      </li>

      {paginationRange.map((pageNumber, index) => {
        return pageNumber === DOTS ? (
          <li
            className={classNames(styles.paginationItem, styles.dots)}
            key={"dots-" + index}
          >
            &#8230;
          </li>
        ) : (
          <li
            className={classNames(styles.paginationItem, {
              [styles.selected]: pageNumber === props.currentPage,
            })}
            key={"page-" + index}
            onClick={() => props.onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classNames(styles.paginationItem, {
          [styles.disabled]: props.currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div
          className={classNames(styles.arrow, styles.right)}
          data-testid="next"
        />
      </li>
    </ul>
  );
};

export default Pagination;

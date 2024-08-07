import { FC } from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { usePagination } from "../model/usePagination";

type Props = {
  totalPageCount: number;
  siblingCount?: number;
};

export const Pagination: FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("pageNumber")) || 1;

  const paginationRange = usePagination({
    totalPageCount: props.totalPageCount,
    currentPage,
    siblingCount: props.siblingCount,
  });
  const lastPage = paginationRange[paginationRange.length - 1];
  const DOTS = -1;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onPageChange = (page: number) => {
    setSearchParams((params) => {
      params.set("pageNumber", page.toString());
      return params;
    });
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className={styles.paginationContainer}>
      <li
        className={classNames(styles.paginationItem, {
          [styles.disabled]: currentPage === 1,
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
              [styles.selected]: pageNumber === currentPage,
            })}
            key={"page-" + index}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classNames(styles.paginationItem, {
          [styles.disabled]: currentPage === lastPage,
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

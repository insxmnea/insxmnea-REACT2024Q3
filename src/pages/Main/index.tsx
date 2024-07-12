import { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { getDeals } from "../../services/api";
import { Deal } from "../../services/models";
import SearchBar from "../../components/SearchBar";
import useHistory from "../../hooks/useHistory";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";

type Props = {};

const Main: FC<Props> = () => {
  const [history] = useHistory();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  useEffect(() => {
    onSearch(history[0], currentPage);

    if (hasError) {
      throw new Error("!!!");
    }
  }, [hasError, currentPage, history]);

  const onSearch = async (search: string = "", page: number = 1) => {
    setIsFetching(true);
    setDeals([]);
    setTotalPageCount(0);

    const res = await getDeals(search, page - 1);
    setDeals(res.deals);
    setTotalPageCount(res.totalPageCount);
    setIsFetching(false);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchBar onSearch={onSearch} />

        <button
          onClick={() => {
            setHasError(true);
          }}
        >
          Throw error
        </button>
      </header>

      <div className={styles.title}>Search results for: {history[0]}</div>

      <CardList deals={deals} isFetching={isFetching} />
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPageCount={totalPageCount}
        />
      </div>
    </div>
  );
};

export default Main;

import { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { getDeals } from "../../services/api";
import { Deal } from "../../services/models";
import SearchBar from "../../components/SearchBar";
import useHistory from "../../hooks/useHistory";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";

type Props = {};

const Main: FC<Props> = () => {
  const [history, updateHistory] = useHistory();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams({
    title: "",
    pageNumber: "1",
    details: "0",
  });
  const currentPage = Number(searchParams.get("pageNumber")) || 1;
  const title = searchParams.get("title") || history[0] || "";

  useEffect(() => {
    if (hasError) {
      throw new Error("!!!");
    }

    onSearch(title, currentPage);
  }, [hasError, searchParams, history]);

  const onSearch = async (search: string = "", page: number = 1) => {
    if (isFetching) return;
    setIsFetching(true);
    setDeals([]);

    if (history[0] !== search) {
      updateHistory(search);
      setSearchParams({
        title: search,
        pageNumber: "1",
        details: "0",
      });
    }

    try {
      const res = await getDeals(search, page - 1);
      setDeals(res.deals);
      setTotalPageCount(res.totalPageCount);
    } catch (error) {
      setHasError(true);
      console.error("Failed to fetch deals:", error);
    } finally {
      setIsFetching(false);
      setSearchParams({
        title: search,
        pageNumber: page.toString(),
        details: "0",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchBar history={history} onSearch={onSearch} />

        <button
          onClick={() => {
            setHasError(true);
          }}
        >
          Throw error
        </button>
      </header>

      {history[0] && (
        <div className={styles.title}>Search results for: {history[0]}</div>
      )}

      <CardList deals={deals} isFetching={isFetching} />

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => {
            setSearchParams({
              title: title,
              pageNumber: page.toString(),
              details: "0",
            });
          }}
          totalPageCount={totalPageCount + 1}
        />
      </div>
    </div>
  );
};

export default Main;

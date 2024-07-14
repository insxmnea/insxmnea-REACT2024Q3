import { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { getDeals } from "../../services/api";
import { Deal } from "../../services/models";
import SearchBar from "../../components/SearchBar";
import useHistory from "../../hooks/useHistory";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import { Outlet, useSearchParams } from "react-router-dom";

type Props = {};

const Main: FC<Props> = () => {
  const [history, updateHistory] = useHistory();

  const [deals, setDeals] = useState<Deal[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("pageNumber")) || 1;
  const title = searchParams.get("title") || history[0] || "";

  const fetchData = async () => {
    setIsFetching(true);

    try {
      const data = await getDeals(title, currentPage - 1);
      setDeals(data.deals);
      setTotalPageCount(data.totalPageCount);
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, title]);

  const onSearch = async (search: string = "", page: number = 1) => {
    updateHistory(search);

    if (history[0] !== search) {
      setTotalPageCount(0);
    }

    setSearchParams((params) => {
      params.set("title", search);
      params.set("pageNumber", page.toString());
      return params;
    });
  };

  if (hasError) {
    throw new Error("!!!");
  }

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

      {title && <div className={styles.title}>Search results for: {title}</div>}

      <div className={styles.content}>
        <div className={styles.list}>
          <CardList deals={deals} isFetching={isFetching} />

          <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              onPageChange={(page) => {
                setSearchParams((params) => {
                  params.set("pageNumber", page.toString());
                  return params;
                });
              }}
              totalPageCount={totalPageCount + 1}
            />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Main;

import { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { getDeals } from "../../services/api";
import { Deal } from "../../services/models";
import SearchBar from "../../components/SearchBar";
import useHistory from "../../hooks/useHistory";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import DetailedCard from "../../components/DetailedCard";

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
  });
  const currentPage = Number(searchParams.get("pageNumber")) || 1;
  const title = searchParams.get("title") || history[0] || "";

  const isDetailsOpen = Boolean(Number(searchParams.get("details"))) || false;
  const [detailedCardId, setDetailedCardId] = useState<string>("");

  useEffect(() => {
    if (hasError) {
      throw new Error("!!!");
    }

    if (isDetailsOpen && !detailedCardId) {
      setSearchParams((params) => {
        params.set("details", "0");
        return params;
      });
    }

    onSearch(title, currentPage);
  }, [hasError, currentPage, title]);

  const onSearch = async (search: string = "", page: number = 1) => {
    if (isFetching) return;
    setIsFetching(true);
    setDeals([]);

    if (history[0] !== search) {
      setTotalPageCount(0);
      updateHistory(search);

      setSearchParams((params) => {
        params.set("title", search);
        params.set("pageNumber", "1");
        return params;
      });
    }

    try {
      const data = await getDeals(search, page - 1);
      setDeals(data.deals);
      setTotalPageCount(data.totalPageCount);
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    } finally {
      setIsFetching(false);
      setSearchParams((params) => {
        params.set("title", search);
        params.set("pageNumber", page.toString());
        return params;
      });
    }
  };

  const handleCardClick = (id: string) => {
    setDetailedCardId(id);

    setSearchParams((params) => {
      params.set("details", "1");
      return params;
    });
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

      <div className={styles.content}>
        <div className={styles.list}>
          <CardList
            deals={deals}
            isFetching={isFetching}
            handleCardClick={handleCardClick}
          />

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

        {isDetailsOpen && detailedCardId && (
          <DetailedCard
            id={detailedCardId}
            hideDetailedCard={() =>
              setSearchParams((params) => {
                params.set("details", "0");
                return params;
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default Main;

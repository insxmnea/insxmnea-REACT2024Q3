import { FC, useEffect, useState } from "react";
import { Deal } from "../../services/models";
import styles from "./DealsList.module.scss";
import DealCard from "../DealCard";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router-dom";
import { getDeals } from "../../services/api";

type Props = {};

const DealsList: FC<Props> = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("pageNumber")) || 1;
  const title = searchParams.get("title") || "";

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

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className={styles.list}>
      {title && <div className={styles.title}>Search results for: {title}</div>}

      <ul>
        {!deals.length ? (
          <li className={styles.noResults}>No results</li>
        ) : (
          <li className={styles.deals}>
            {deals.map((deal) => (
              <DealCard deal={deal} key={deal.dealID} />
            ))}
          </li>
        )}
      </ul>

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
  );
};

export default DealsList;

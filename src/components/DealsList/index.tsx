import { FC } from "react";
import styles from "./DealsList.module.scss";
import DealCard from "../DealCard";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router-dom";
import { dealsAPI } from "../../services/DealService";
import SelectedDealsFlyout from "../SelectedDealsFlyout";

type Props = {};

const DealsList: FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("pageNumber")) || 1;
  const title = searchParams.get("title") || "";

  const { data, isFetching, isError } = dealsAPI.useGetDealsQuery({
    title: title,
    pageNumber: currentPage - 1,
  });

  if (isFetching) {
    return <Loader />;
  }

  if (!data || isError) {
    return <span className={styles.noResults}>No results</span>;
  }

  return (
    <div className={styles.list}>
      {title && <div className={styles.title}>Search results for: {title}</div>}

      <ul>
        {!data.deals ? (
          <li className={styles.noResults}>No results</li>
        ) : (
          <li className={styles.deals}>
            {data.deals.map((deal) => (
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
          totalPageCount={data.totalPageCount + 1}
        />
      </div>

      <SelectedDealsFlyout />
    </div>
  );
};

export default DealsList;

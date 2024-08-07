import { FC } from "react";
import styles from "./DealsList.module.scss";
import { useSearchParams } from "react-router-dom";
import { DealCard } from "src/widgets/deal-card";
import { Loader } from "src/shared/ui/loader";
import { Pagination } from "src/features/pagination";
import { SelectedDealsFlyout } from "src/widgets/selected-deals-flyout";
import { dealsAPI } from "src/entities/deal";

type Props = {};

export const DealsList: FC<Props> = () => {
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
        {data.deals ? (
          <li className={styles.deals}>
            {data.deals.map((deal) => (
              <DealCard {...deal} key={deal.dealID} />
            ))}
          </li>
        ) : (
          <li className={styles.noResults}>No results</li>
        )}
      </ul>

      <div className={styles.pagination}>
        <Pagination totalPageCount={data.totalPageCount + 1} />
      </div>

      <SelectedDealsFlyout />
    </div>
  );
};

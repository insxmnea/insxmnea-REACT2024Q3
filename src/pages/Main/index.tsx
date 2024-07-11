import { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { getDeals } from "../../services/api";
import { Deal } from "../../services/models";
import DealCard from "../../components/DealCard";
import SearchBar from "../../components/SearchBar";
import historyService from "../../services/historyService";
import Loader from "../../components/Loader";

type Props = {};

const Main: FC<Props> = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    onSearch(historyService.loadHistory()[0]);

    if (hasError) {
      throw new Error("!!!");
    }
  }, [hasError]);

  const onSearch = async (search: string = "") => {
    setDeals([]);
    setNoResults(false);

    const res = await getDeals(search);
    setDeals(res);
    setNoResults(res.length === 0);
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

      {deals.length === 0 && !noResults && <Loader />}

      {noResults && <div className={styles.noResults}>Not found</div>}

      <div className={styles.deals}>
        {deals.map((deal) => (
          <DealCard deal={deal} key={deal.dealID} />
        ))}
      </div>
    </div>
  );
};

export default Main;

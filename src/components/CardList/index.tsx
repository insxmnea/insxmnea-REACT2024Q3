import { FC } from "react";
import { Deal } from "../../services/models";
import styles from "./CardList.module.scss";
import Card from "../Card";
import Loader from "../Loader";

type Props = {
  deals: Deal[];
  isFetching: boolean;
};

const CardList: FC<Props> = ({ deals, isFetching }) => {
  return (
    <>
      {isFetching && <Loader />}

      {!isFetching && !deals.length ? (
        <div className={styles.noResults}>Not found</div>
      ) : (
        <div className={styles.deals}>
          {deals.map((deal) => (
            <Card deal={deal} key={deal.dealID} />
          ))}
        </div>
      )}
    </>
  );
};

export default CardList;

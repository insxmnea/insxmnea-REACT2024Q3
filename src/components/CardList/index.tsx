import { FC } from "react";
import { Deal } from "../../services/models";
import styles from "./CardList.module.scss";
import Card from "../Card";
import Loader from "../Loader";

type Props = {
  deals: Deal[];
  isFetching: boolean;
  handleCardClick: (id: string) => void;
};

const CardList: FC<Props> = (props) => {
  if (props.isFetching) {
    return <Loader />;
  }

  return (
    <>
      {!props.deals.length ? (
        <div className={styles.noResults}>No results</div>
      ) : (
        <div className={styles.deals}>
          {props.deals.map((deal) => (
            <Card
              deal={deal}
              key={deal.dealID}
              handleCardClick={(id) => {
                props.handleCardClick(id);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CardList;

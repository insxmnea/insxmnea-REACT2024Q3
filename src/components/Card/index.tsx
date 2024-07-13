import { FC } from "react";
import { Deal } from "../../services/models";
import styles from "./Card.module.scss";
import { truncate } from "../../utils/helper";

type Props = {
  deal: Deal;
  handleCardClick: (id: string) => void;
};

const Card: FC<Props> = (props) => {
  return (
    <div
      className={styles.wrapper}
      onClick={() => props.handleCardClick(props.deal.dealID)}
    >
      <div className={styles.thumbContainer}>
        <img className={styles.thumb} src={props.deal.thumb} />
      </div>

      <div className={styles.info}>
        <span>{truncate(props.deal.title, 22)}</span>
        <div className={styles.pricesContainer}>
          <div className={styles.prices}>
            <span className={styles.salePrice}>{props.deal.salePrice}$</span>
            <span className={styles.normalPrice}>
              {props.deal.normalPrice}$
            </span>
          </div>
          <a
            className={styles.buy}
            href={`https://store.steampowered.com/app/${props.deal.steamAppID}`}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

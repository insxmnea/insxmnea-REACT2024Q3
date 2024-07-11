import { FC } from "react";
import { Deal } from "../../services/models";
import styles from "./Card.module.scss";

type Props = {
  deal: Deal;
};

const Card: FC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbContainer}>
        <img className={styles.thumb} src={props.deal.thumb} />
      </div>

      <div className={styles.info}>
        <span>{props.deal.title}</span>
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
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

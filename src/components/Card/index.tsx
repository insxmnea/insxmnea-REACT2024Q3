import { FC } from "react";
import { Deal } from "../../services/models";
import styles from "./Card.module.scss";
import { truncate } from "../../utils/helper";
import { Link, useSearchParams } from "react-router-dom";

type Props = {
  deal: Deal;
};

const Card: FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Link
      to={`/insxmnea-REACT2024Q3/details?id=${props.deal.dealID}&${searchParams.toString()}`}
      className={styles.wrapper}
    >
      <div className={styles.thumbContainer}>
        <img className={styles.thumb} src={props.deal.thumb} />
      </div>

      <div className={styles.info}>
        <span>{truncate(props.deal.title, 22)}</span>

        <div className={styles.prices}>
          <span className={styles.salePrice}>
            {currencyFormat.format(Number(props.deal.salePrice))}
          </span>
          <span className={styles.normalPrice}>
            {currencyFormat.format(Number(props.deal.normalPrice))}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;

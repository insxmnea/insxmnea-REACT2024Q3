import { FC } from "react";
import { Deal } from "../../services/models";
import styles from "./Card.module.scss";
import { truncate } from "../../utils/helper";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  deal: Deal;
};

const Card: FC<Props> = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCardClick = (id: string) => {
    setSearchParams((params) => {
      params.set("id", id);
      return params;
    });

    navigate(
      {
        pathname: "/insxmnea-REACT2024Q3/details",
        search: searchParams.toString(),
      },
      { replace: true }
    );
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleCardClick(props.deal.dealID)}
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

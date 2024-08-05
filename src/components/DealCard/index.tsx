import { ChangeEvent, FC, useMemo } from "react";
import { Deal } from "../../services/models";
import styles from "./DealCard.module.scss";
import { truncate } from "../../utils/helper";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addDeal, removeDeal } from "../../store/reducers/SelectedDealsSlice";
import classNames from "classnames";

const checkSelected = (deals: Deal[], id: string) => {
  return deals.some((deal) => deal.dealID === id);
};

type Props = {
  deal: Deal;
};

const DealCard: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((state) => state.selectedDealsReducer);

  const isChecked = useMemo(
    () => checkSelected(deals, props.deal.dealID),
    [deals, props.deal.dealID]
  );

  const [searchParams] = useSearchParams();
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addDeal(props.deal));
    } else {
      dispatch(removeDeal(props.deal.dealID));
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={`checkbox-${props.deal.dealID}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <Link
        to={`/insxmnea-REACT2024Q3/details?id=${props.deal.dealID}&${searchParams.toString()}`}
        className={classNames(styles.card, {
          [styles.checked]: isChecked,
        })}
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
    </div>
  );
};

export default DealCard;

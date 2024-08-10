import { ChangeEvent, FC, useMemo } from "react";
import styles from "./DealCard.module.scss";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { truncate } from "src/shared/lib/helper";
import { Deal } from "src/entities/deal";
import {
  addDeal,
  removeDeal,
} from "src/entities/selected-deals/model/SelectedDealsSlice";
import Link from "next/link";

const checkSelected = (deals: Deal[], id: string) => {
  return deals.some((deal) => deal.dealID === id);
};

interface Props extends Deal {}

export const DealCard: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((state) => state.selectedDealsReducer);

  const isChecked = useMemo(
    () => checkSelected(deals, props.dealID),
    [deals, props.dealID]
  );

  const searchParams = useSearchParams();
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addDeal(props));
    } else {
      dispatch(removeDeal(props.dealID));
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={`checkbox-${props.dealID}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <Link
        href={`/details?id=${props.dealID}&${searchParams?.toString()}`}
        // href={`/insxmnea-REACT2024Q3/details?id=${props.dealID}&${searchParams?.toString()}`}
        className={classNames(styles.card, {
          [styles.checked]: isChecked,
        })}
      >
        <div className={styles.thumbContainer}>
          <img className={styles.thumb} src={props.thumb} />
        </div>

        <div className={styles.info}>
          <span>{truncate(props.title, 22)}</span>

          <div className={styles.prices}>
            <span className={styles.salePrice}>
              {currencyFormat.format(Number(props.salePrice))}
            </span>
            <span className={styles.normalPrice}>
              {currencyFormat.format(Number(props.normalPrice))}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

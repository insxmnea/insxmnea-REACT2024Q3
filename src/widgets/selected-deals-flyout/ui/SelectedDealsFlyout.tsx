import { FC } from "react";
import styles from "./SelectedDealsFlyout.module.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { clearDeals } from "src/entities/selected-deals/model/SelectedDealsSlice";
import { downloadCSV } from "src/entities/selected-deals";

export const SelectedDealsFlyout: FC = () => {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((state) => state.selectedDealsReducer);

  const handleUnselectAll = () => {
    dispatch(clearDeals());
  };

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.hidden]: deals.length === 0,
      })}
    >
      <button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <span className={styles.count}>{deals.length} items are selected</span>
      <button
        className={styles.button}
        onClick={() => downloadCSV(deals, `${deals.length}_deals`)}
      >
        Download
      </button>
    </div>
  );
};

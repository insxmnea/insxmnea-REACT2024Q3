import { FC } from "react";
import styles from "./SelectedDealsFlyout.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearDeals } from "../../store/reducers/SelectedDealsSlice";
import downloadCSV from "../../utils/downloadCSV";
import classNames from "classnames";

const SelectedDealsFlyout: FC = () => {
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

export default SelectedDealsFlyout;

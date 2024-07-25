import { FC } from "react";
import styles from "./SelectedDealsFlyout.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearDeals } from "../../store/reducers/SelectedDealsSlice";

const SelectedDealsFlyout: FC = () => {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((state) => state.selectedDealsReducer);

  const handleUnselectAll = () => {
    dispatch(clearDeals());
  };

  return (
    <div
      className={`${styles.wrapper} ${deals.length > 0 ? "" : styles.hidden}`}
    >
      <button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <span className={styles.count}>{deals.length} items are selected</span>
      <button className={styles.button}>Download</button>
    </div>
  );
};

export default SelectedDealsFlyout;

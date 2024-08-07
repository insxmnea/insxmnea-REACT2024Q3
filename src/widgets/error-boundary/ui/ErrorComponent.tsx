import { FC } from "react";
import styles from "./ErrorComponent.module.scss";

export const ErrorComponent: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Something went wrong :(</h1>
    </div>
  );
};

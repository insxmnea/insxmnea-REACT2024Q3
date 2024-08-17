import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";

export const HomePage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} to="/form-uncontrolled">
        Uncontrolled form
      </Link>
      <Link className={styles.link} to="/form-controlled">
        Controlled form
      </Link>
    </div>
  );
};

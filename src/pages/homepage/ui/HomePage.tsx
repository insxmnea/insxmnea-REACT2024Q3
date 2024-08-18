import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { useAppSelector } from "@/shared";

export const HomePage: FC = () => {
  const { formInput } = useAppSelector((state) => state.FormInputReducer);

  return (
    <div className={styles.wrapper}>
      <div className={styles.links}>
        <Link className={styles.link} to="/form-uncontrolled">
          Uncontrolled form
        </Link>
        <Link className={styles.link} to="/form-controlled">
          Controlled form
        </Link>
      </div>

      {formInput.name && (
        <div className={styles.info}>
          <div className={styles.data}>
            <span>Name: {formInput.name}</span>
            <span>Age: {formInput.age}</span>
            <span>Gender: {formInput.gender}</span>
            <span>Country: {formInput.country}</span>
            <span>Email: {formInput.email}</span>
          </div>

          <div className={styles.image}>
            <img src={formInput.picture} alt="User image" />
          </div>
        </div>
      )}
    </div>
  );
};

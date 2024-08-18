import { ControlledForm } from "@/widgets/controlled-form";
import { FC } from "react";
import styles from "./ControlledFormPage.module.scss";

export const ControlledFormPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ControlledForm />
    </div>
  );
};

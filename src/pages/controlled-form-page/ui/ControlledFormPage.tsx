import { FC } from "react";
import styles from "./ControlledFormPage.module.scss";
import { ControlledForm } from "@/widgets/form";

export const ControlledFormPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ControlledForm />
    </div>
  );
};

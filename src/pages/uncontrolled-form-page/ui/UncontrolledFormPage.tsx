import { FC } from "react";
import styles from "./UncontrolledFormPage.module.scss";
import { UncontrolledForm } from "@/widgets/form";

export const UncontrolledFormPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <UncontrolledForm />
    </div>
  );
};

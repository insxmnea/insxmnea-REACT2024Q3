import { UncontrolledForm } from "@/widgets/uncontrolled-form";
import { FC } from "react";
import styles from "./UncontrolledFormPage.module.scss";

export const UncontrolledFormPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <UncontrolledForm />
    </div>
  );
};

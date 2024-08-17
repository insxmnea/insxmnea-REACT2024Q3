import { FC } from "react";
import * as yup from "yup";
import styles from "./UncontrolledForm.module.scss";

type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean;
  country: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().min(0).max(100).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  gender: yup.string().required(),
  checkbox: yup.boolean().required(),
});

export const UncontrolledForm: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Name" />
      <input type="number" name="age" placeholder="Age" min={0} max={100} />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" />
      <select name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <div>
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms">accept Terms and Conditions</label>
      </div>
      <input type="file" name="photo" />
      <input list="country" placeholder="Country" />
      <datalist id="country">
        <option>Russia</option>
        <option>Germany</option>
        <option>United Kingdom</option>
      </datalist>
      <input type="submit" value="Submit" />
    </form>
  );
};

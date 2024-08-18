import { FC, useRef, useState } from "react";
import styles from "./UncontrolledForm.module.scss";
import { getBase64, useAppDispatch, useAppSelector } from "@/shared";
import { useNavigate } from "react-router-dom";
import { ValidationSchema } from "@/entities/form-input";
import * as yup from "yup";
import { addFormInput } from "@/entities/form-input/models/FormInputSlice";

export const UncontrolledForm: FC = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.FormInputReducer);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      name: nameRef.current?.value,
      age: ageRef.current?.valueAsNumber,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value,
    };

    try {
      await ValidationSchema.validate(formValues, { abortEarly: false });
      let image = "";
      if (formValues.picture) {
        image = await getBase64(formValues.picture[0]);
      }

      dispatch(
        addFormInput({
          name: formValues.name ?? "",
          age: formValues.age ?? 0,
          email: formValues.email ?? "",
          password: formValues.password ?? "",
          gender: formValues.gender ?? "",
          terms: formValues.terms ?? false,
          picture: image,
          country: formValues.country ?? "",
        })
      );

      navigate({
        pathname: "/",
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path!] = error.message!;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.control}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              ref={nameRef}
              name="name"
              id="name"
              autoComplete="name-given"
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.control}>
            <label htmlFor="age">Age:</label>
            <input type="number" ref={ageRef} name="age" id="age" min={0} />
            {errors.age && <p className={styles.error}>{errors.age}</p>}
          </div>

          <div className={styles.control}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              ref={emailRef}
              name="email"
              id="email"
              autoComplete="email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.control}>
            <label htmlFor="password">Password:</label>
            <div className={styles.row}>
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                name="password"
                id="password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div className={styles.control}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              name="confirmPassword"
              id="confirmPassword"
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
          </div>

          <div className={styles.control}>
            <label>Gender:</label>
            <select name="gender" id="gender" ref={genderRef}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className={styles.error}>{errors.gender}</p>}
          </div>
        </div>
      </div>

      <div className={styles.control}>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input type="checkbox" ref={termsRef} name="terms" id="terms" />
        {errors.terms && <p className={styles.error}>{errors.terms}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="picture">Upload Picture:</label>
        <input type="file" ref={pictureRef} name="picture" id="picture" />
        {errors.picture && <p className={styles.error}>{errors.picture}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          ref={countryRef}
          name="country"
          id="country"
          list="country-list"
          autoComplete="country-name"
        />

        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        {errors.country && <p className={styles.error}>{errors.country}</p>}
      </div>

      <button className={styles.submit} type="submit">
        Submit
      </button>
    </form>
  );
};

import { FC, useState } from "react";
import styles from "./ControlledForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationData, ValidationSchema } from "@/entities/form-input";
import { addFormInput } from "@/entities/form-input/models/FormInputSlice";
import { getBase64, useAppDispatch, useAppSelector } from "@/shared";
import { useNavigate } from "react-router-dom";

export const ControlledForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationData>({ resolver: yupResolver(ValidationSchema) });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.FormInputReducer);

  const navigate = useNavigate();

  const onSubmit = async (data: ValidationData) => {
    const image = await getBase64(data.picture[0]);

    dispatch(
      addFormInput({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        gender: data.gender,
        terms: data.terms,
        picture: image,
        country: data.country,
      })
    );

    navigate({
      pathname: "/",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.control}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              {...register("name")}
              id="name"
              autoComplete="off"
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.control}>
            <label htmlFor="age">Age:</label>
            <input type="number" {...register("age")} id="age" min={0} />
            {errors.age && <p className={styles.error}>{errors.age.message}</p>}
          </div>

          <div className={styles.control}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              {...register("email")}
              id="email"
              autoComplete="email"
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.control}>
            <label htmlFor="password">Password:</label>
            <div className={styles.row}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
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
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.control}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              {...register("confirmPassword")}
              id="confirmPassword"
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className={styles.control}>
            <label htmlFor="gender">Gender:</label>
            <select {...register("gender")} id="gender">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className={styles.error}>{errors.gender.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.control}>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input type="checkbox" {...register("terms")} id="terms" />
        {errors.terms && <p className={styles.error}>{errors.terms.message}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="picture">Upload Picture:</label>
        <input type="file" {...register("picture")} id="picture" />
        {errors.picture && (
          <p className={styles.error}>{errors.picture.message}</p>
        )}
      </div>

      <div className={styles.control}>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          {...register("country")}
          id="country"
          list="country-list"
          autoComplete="country-name"
        />

        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        {errors.country && (
          <p className={styles.error}>{errors.country.message}</p>
        )}
      </div>

      <button
        className={styles.submit}
        type="submit"
        disabled={Object.keys(errors).length > 0}
      >
        Submit
      </button>
    </form>
  );
};

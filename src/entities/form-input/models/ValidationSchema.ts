import * as yup from "yup";
import { FormInput } from "../types/FormInput";

export type ValidationData = Omit<FormInput, "picture"> & {
  picture: FileList;
  confirmPassword: string;
};

export const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, "First letter must be uppercase")
    .required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .min(0, "Age cannot be negative")
    .required("Age is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .matches(/(?=.*\d)/, "Password must contain at least one digit")
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(/(?=.*\W)/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
  picture: yup
    .mixed<FileList>()
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) =>
        !value ||
        (value[0] && ["image/jpeg", "image/png"].includes(value[0].type))
    )
    .test(
      "fileSize",
      "File is too large",
      (value) => !value || (value[0] && value[0].size <= 2 * 1024 * 1024)
    )
    .required("Picture is required"),
  country: yup.string().required("Country is required"),
});

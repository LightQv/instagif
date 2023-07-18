import * as Yup from "yup";

export default function handleErrors() {}

export const loginSchema = Yup.object({
  email: Yup.string().email("A valid Email is required."),
  password: Yup.string().min(7, "Password : Minimum 7 characters"),
});

export const registerSchema = Yup.object({
  username: Yup.string().min(5, "Username : Min 5 characters"),
  email: Yup.string().email("A valid Email is required."),
  password: Yup.string().min(7, "Password : Minimum 7 characters"),
});

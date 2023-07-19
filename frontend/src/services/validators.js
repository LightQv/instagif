import * as Yup from "yup";

export default function handleErrors() {}

export const loginSchema = Yup.object({
  email: Yup.string().email("A valid Email is required."),
  password: Yup.string().min(7, "Password : Minimum 7 characters"),
});

export const registerSchema = Yup.object({
  username: Yup.string().min(5, "Username : Minimum 5 characters"),
  email: Yup.string().email("A valid Email is required."),
  password: Yup.string().min(7, "Password : Minimum 7 characters"),
});

export const addPostSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title : Minimum 5 characters.")
    .max(30, "Title : Maximum 30 characters."),
  gif_url: Yup.string().required(),
  user_id: Yup.number().required().positive().integer(),
});

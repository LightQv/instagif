import * as Yup from "yup";

export default function handleErrors() {}

export const loginSchema = Yup.object({
  email: Yup.string().email("Email : a valid Email is required.").max(255),
  password: Yup.string()
    .min(7, "Password : Minimum 7 characters")
    .max(30, "Password : Maximum 30 characters"),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(5, "Username : Minimum 5 characters")
    .max(30, "Username : Maximum 30 characters"),
  email: Yup.string().email("Email : a valid Email is required.").max(255),
  password: Yup.string()
    .min(7, "Password : Minimum 7 characters")
    .max(30, "Password : Maximum 30 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match."
  ),
});

export const addPostSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title : Minimum 5 characters.")
    .max(30, "Title : Maximum 30 characters."),
  gif_url: Yup.string().required(),
  user_id: Yup.number().required().positive().integer(),
});

export const editProfileSchema = Yup.object({
  username: Yup.string()
    .min(5, "Username : Minimum 5 characters")
    .max(30, "Username : Maximum 30 characters"),
});

export const editMailSchema = Yup.object({
  email: Yup.string().email("Email : a valid Email is required.").max(255),
});

export const editPwSchema = Yup.object({
  password: Yup.string()
    .min(7, "Password : Minimum 7 characters")
    .max(30, "Password : Maximum 30 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match."
  ),
});

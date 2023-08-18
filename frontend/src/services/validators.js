import * as Yup from "yup";

export default function handleErrors() {}

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("A valid Email is required.")
    .min(8, "Minimum 8 characters.")
    .max(255, "Maximum 255 characters."),
  password: Yup.string()
    .min(7, "Minimum 7 characters.")
    .max(30, "Maximum 30 characters."),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(5, "Minimum 5 characters.")
    .max(30, "Maximum 30 characters."),
  email: Yup.string()
    .email("A valid Email is required.")
    .min(8, "Minimum 8 characters.")
    .max(255, "Maximum 255 characters."),
  password: Yup.string()
    .min(7, "Minimum 7 characters.")
    .max(30, "Maximum 30 characters."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match."
  ),
});

export const forgottenSchema = Yup.object({
  email: Yup.string()
    .email("A valid Email is required.")
    .min(8, "Minimum 8 characters.")
    .max(255, "Maximum 255 characters."),
});

export const resetSchema = Yup.object({
  email: Yup.string()
    .email("A valid Email is required.")
    .min(8, "Minimum 8 characters.")
    .max(255, "Maximum 255 characters."),
  password: Yup.string()
    .min(7, "Minimum 7 characters.")
    .max(30, "Maximum 30 characters."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match."
  ),
  passwordToken: Yup.string().required(),
});

export const addPostSchema = Yup.object({
  title: Yup.string()
    .min(5, "Minimum 5 characters.")
    .max(30, "Maximum 30 characters."),
  gif_url: Yup.string().required(),
  user_id: Yup.number().required().positive().integer(),
});

export const editProfileSchema = Yup.object({
  username: Yup.string()
    .min(5, "Minimum 5 characters.")
    .max(30, "Maximum 30 characters."),
});

export const editMailSchema = Yup.object({
  email: Yup.string()
    .email("A valid Email is required.")
    .min(8, "Minimum 8 characters.")
    .max(255, "Maximum 255 characters."),
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

import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import APIService from "../../services/APIService";
import { loginSchema } from "../../services/validators";
import { notifyError } from "../../services/toasts";
import { useThemeContext } from "../../contexts/ThemeContext";
import SightSvg from "../svg/SightSvg";
import UnsightSvg from "../svg/UnsightSvg";

export default function LoginForm({ setForm }) {
  const { login } = useUserContext();
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.post(`/login`, values);
        if (res) {
          login(res.data);
          navigate("/");
        } else throw new Error();
      } catch (error) {
        if (error.request.status === 401) {
          notifyError("Email or Password invalid.");
        }
      }
    },
  });

  useEffect(() => {
    if (searchParams.has("expired")) {
      notifyError("Unauthorized, please login.");
      setSearchParams(() => {
        return undefined;
      });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center p-6 lg:w-2/6 lg:rounded-md lg:bg-sand-0 lg:p-8 dark:lg:bg-granite-0">
      <form
        action="login"
        onSubmit={formik.handleSubmit}
        className="gap-4 space-y-4 lg:gap-6 lg:space-y-6"
      >
        <h3 className="font-spartan text-2xl font-semibold dark:text-dust-0">
          Login
        </h3>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 ml-1 text-base"
            style={
              formik.touched.email && formik.errors.email
                ? { color: "rgb(239, 3, 3)" }
                : { color: theme === "dark" ? "#f1efe7" : "black" }
            }
          >
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email"}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            required=""
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 flex w-full items-center justify-between text-base"
          >
            <h3
              className="ml-1"
              style={
                formik.touched.password && formik.errors.password
                  ? { color: "rgb(239, 3, 3)" }
                  : { color: theme === "dark" ? "#f1efe7" : "black" }
              }
            >
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : "Password"}
            </h3>
            <button
              type="button"
              className="mr-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <SightSvg /> : <UnsightSvg />}
            </button>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required=""
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50 dark:bg-cobble-0 dark:text-sand-0"
          />
        </div>
        <button
          type="submit"
          className="h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-base font-semibold text-dust-0 disabled:bg-gray-300 disabled:text-gray-800"
          onSubmit={formik.handleSubmit}
          disabled={!loginSchema.isValidSync(formik.values)}
        >
          Login
        </button>
      </form>
      <h4 className="mt-6 self-center font-spartan text-sm italic dark:text-dust-0">
        You don't have an account,{" "}
        <button
          type="button"
          className="font-semibold text-red-800"
          onClick={() => setForm({ login: false, register: true })}
        >
          Register here
        </button>
        .
      </h4>
    </div>
  );
}

LoginForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};

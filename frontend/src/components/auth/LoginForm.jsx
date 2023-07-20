import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import APIService from "../../services/APIService";
import { loginSchema } from "../../services/validators";
import { notifyError } from "../../services/toasts";

export default function LoginForm({ setForm }) {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
      notifyError("Session expirée, veuillez vous reconnecter.");
      setSearchParams(() => {
        return undefined;
      });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center p-6 lg:w-2/6 lg:rounded-md lg:bg-sand-0 lg:p-8">
      <form
        action="login"
        onSubmit={formik.handleSubmit}
        className="gap-4 space-y-4 lg:gap-6 lg:space-y-6"
      >
        <h3 className="font-spartan text-2xl font-semibold">Login</h3>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 text-base"
            style={
              formik.touched.email && formik.errors.email
                ? { color: "rgb(239, 3, 3)" }
                : { color: "black" }
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
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 text-base"
            style={
              formik.touched.password && formik.errors.password
                ? { color: "rgb(239, 3, 3)" }
                : { color: "black" }
            }
          >
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Password"}
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
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50"
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
      <h4 className="mt-6 self-center font-spartan text-sm italic">
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

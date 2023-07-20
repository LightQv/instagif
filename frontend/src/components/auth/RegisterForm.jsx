import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useUserContext } from "../../contexts/UserContext";
import APIService from "../../services/APIService";
import { registerSchema } from "../../services/validators";
import notifySuccess, { notifyError } from "../../services/toasts";

export default function RegisterForm({ setForm }) {
  const { login } = useUserContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.post(`/users`, values);
        if (res) {
          login(res.data);
          notifySuccess("Account created, please Login");
          setForm({ login: true, register: false });
        } else throw new Error();
      } catch (error) {
        if (
          error.request.status === 422 &&
          error.response.data.validationErrors[0].context.key === "email"
        ) {
          notifyError("This email is already taken.");
        }
        if (error.request.status === 500) {
          notifyError("This username is already taken.");
        }
      }
    },
  });
  return (
    <div className="flex flex-col justify-center p-6 lg:w-2/6 lg:rounded-md lg:bg-sand-0 lg:p-8">
      <form
        action="login"
        onSubmit={formik.handleSubmit}
        className="gap-4 space-y-4 lg:gap-6 lg:space-y-6"
      >
        <h3 className="font-spartan text-2xl font-semibold">Register</h3>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-2 text-base"
            style={
              formik.touched.username && formik.errors.username
                ? { color: "rgb(239, 3, 3)" }
                : { color: "black" }
            }
          >
            {formik.touched.username && formik.errors.username
              ? formik.errors.username
              : "Username"}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required=""
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md px-4 py-2 placeholder:italic placeholder:opacity-50"
          />
        </div>
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
          className="h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-base font-semibold text-white disabled:bg-gray-300 disabled:text-gray-800"
          onSubmit={formik.handleSubmit}
          disabled={!registerSchema.isValidSync(formik.values)}
        >
          Register
        </button>
      </form>
      <h4 className="mt-6 self-center font-spartan text-sm italic">
        You already have an account,{" "}
        <button
          type="button"
          className="font-semibold text-red-800"
          onClick={() => setForm({ login: true, register: false })}
        >
          Login here
        </button>
        .
      </h4>
    </div>
  );
}

RegisterForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};

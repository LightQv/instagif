import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useUserContext } from "../contexts/UserContext";
import BackSvg from "../components/svg/BackSvg";
import APIService from "../services/APIService";
import { editProfileSchema } from "../services/validators";
import { notifyError } from "../services/toasts";

export default function ProfileEdition() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: user.username,
    },

    validationSchema: editProfileSchema,

    onSubmit: async (values) => {
      try {
        const res = await APIService.put(`/users/${user.id}`, values);
        if (res) {
          logout();
        } else throw new Error();
      } catch (error) {
        if (error.request.status === 401) {
          notifyError("Username already taken.");
        }
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col justify-start bg-dust-0 pb-12 font-inter lg:mb-0 lg:pb-0 lg:pt-16">
      <header className="flex h-12 w-full items-center justify-between bg-dust-0 px-6 lg:hidden">
        <div className="h-fit w-full">
          <button
            type="button"
            className="float-left transition-all hover:scale-110 hover:text-granite-0"
            onClick={() => navigate(-1)}
          >
            <BackSvg />
          </button>
          <h3 className="mr-6 text-center font-spartan text-xl font-semibold">
            Edit Profile
          </h3>
        </div>
      </header>
      <div className="flex flex-col gap-4 lg:w-2/6 lg:self-center">
        <div className="flex w-full flex-col gap-4 pb-2 pt-4">
          <div className="m-auto flex h-20 w-20 items-center justify-center self-start rounded-full bg-cobble-0 text-3xl text-dust-0">
            {user.username.slice(0, 1).toUpperCase()}
          </div>
        </div>
        <form
          action="login"
          onSubmit={formik.handleSubmit}
          className="gap-4 space-y-4 p-4 lg:gap-6 lg:space-y-6"
        >
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
            <p className="mt-1 text-center text-xs italic">
              Please note that if you change your Username, you'll be
              disconnected and gonna need to Login back again.
            </p>
          </div>
          <button
            type="submit"
            onSubmit={formik.handleSubmit}
            disabled={
              !editProfileSchema.isValidSync(formik.values) ||
              formik.values.username.localeCompare(user.username) === 0
            }
            className="h-fit w-full rounded-md bg-dust-0 bg-red-800 px-4 py-2 text-base font-semibold text-white disabled:bg-gray-300 disabled:text-gray-800"
          >
            Modify
          </button>
        </form>
      </div>
    </main>
  );
}

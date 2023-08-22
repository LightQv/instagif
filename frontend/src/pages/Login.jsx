import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotForm from "../components/auth/ForgotForm";

export default function Login() {
  const [form, setForm] = useState({
    login: true,
    register: false,
    forgotten: false,
  });

  return (
    <main className="flex h-[calc(100dvh-3rem)] w-screen flex-col justify-center bg-dust-0 font-inter dark:bg-cobble-0 lg:h-screen lg:items-center lg:pb-0 lg:pl-60">
      {form.login && <LoginForm setForm={setForm} />}
      {form.register && <RegisterForm setForm={setForm} />}
      {form.forgotten && <ForgotForm setForm={setForm} />}
    </main>
  );
}

import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Login() {
  const [form, setForm] = useState({ login: true, register: false });

  return (
    <main className="flex h-[calc(100dvh-3rem)] w-screen flex-col justify-center bg-dust-0 font-inter dark:bg-cobble-0 lg:mt-16 lg:h-[calc(100dvh-4rem)] lg:items-center">
      {form.login ? (
        <LoginForm setForm={setForm} />
      ) : (
        <RegisterForm setForm={setForm} />
      )}
    </main>
  );
}

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Authentification() {
  const [form, setForm] = useState({ login: true, register: false });

  return form.login ? (
    <LoginForm setForm={setForm} />
  ) : (
    <RegisterForm setForm={setForm} />
  );
}

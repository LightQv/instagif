import Authentification from "../components/auth/Authentification";

export default function Login() {
  return (
    <main className="flex h-[calc(100dvh-3rem)] w-screen flex-col justify-center bg-dust-0 pb-12 font-inter lg:mt-16 lg:h-[calc(100dvh-4rem)] lg:items-center lg:pb-16">
      <Authentification />
    </main>
  );
}

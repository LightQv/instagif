import { useUserContext } from "../context/UserContext";
import Authentification from "../components/auth/Authentification";

export default function Profile() {
  const { user, logout } = useUserContext();

  return (
    <main className="bg-dust-0 h-screen w-screen flex flex-col justify-between font-inter">
      {user?.id ? (
        <>
          <p>Hello</p>
          <button type="button" onClick={logout}>
            Logout
          </button>
          <p>cc</p>
        </>
      ) : (
        <Authentification />
      )}
    </main>
  );
}

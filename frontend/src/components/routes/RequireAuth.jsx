import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function RequireAuth() {
  const { user } = useUserContext();
  const location = useLocation();

  return user?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

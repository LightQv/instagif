import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import APIService from "../services/APIService";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const navigate = useNavigate();

  const login = (_user) => {
    setUser(_user);
    localStorage.setItem("user", JSON.stringify(_user));
  };

  const logout = async () => {
    try {
      const isLogout = await APIService.get("/logout");
      if (isLogout) {
        setUser({});
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const memo = useMemo(() => {
    return { user, setUser, login, logout };
  }, [user]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

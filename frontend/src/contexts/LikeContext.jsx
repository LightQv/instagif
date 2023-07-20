import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "./UserContext";
import APIService from "../services/APIService";
import { notifyError } from "../services/toasts";

const LikeContext = createContext();

export default LikeContext;

export function LikeContextProvider({ children }) {
  const { user } = useUserContext();
  const [likes, setLikes] = useState(null);
  const [sendLike, setSendLike] = useState(false);

  useEffect(() => {
    APIService.get(`/likes-user/${user.id}`)
      .then((res) => {
        setLikes(res.data);
        setSendLike(false);
      })
      .catch(() => notifyError("Error fetching likes datas."));
  }, [user, sendLike]);

  const memo = useMemo(() => {
    return { likes, setSendLike };
  }, [likes]);

  return <LikeContext.Provider value={memo}>{children}</LikeContext.Provider>;
}

export const useLikeContext = () => useContext(LikeContext);

LikeContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

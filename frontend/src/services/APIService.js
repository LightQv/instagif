import axios from "axios";
import history from "./history";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      history.replace(`/login?expired`);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;

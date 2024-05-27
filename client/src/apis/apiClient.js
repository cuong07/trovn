import axios from "axios";
import useUserStore from "../hooks/userStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 60000,
});

const addAuthorizationHeader = (config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
};

apiClient.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);

export { apiClient };

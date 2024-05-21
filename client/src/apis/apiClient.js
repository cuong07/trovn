import axios from "axios";
import useUserStore from "../hooks/userStore";

const apiClient = axios.create({
  baseURL: "http://localhost:8888/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
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

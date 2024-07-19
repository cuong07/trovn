import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useUserStore from "@/hooks/useUserStore";
import { refreshToken } from "./user";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL + "/api/v1",
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
    },
    withCredentials: true,
    timeout: 60000,
});

const addAuthorizationHeader = async (config) => {
    let token = useUserStore.getState().token;
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(
            "Token exp:",
            decodedToken.exp,
            "Current time:",
            currentTime,
            "Is expired:",
            decodedToken.exp < currentTime
        );

        if (decodedToken.exp < currentTime) {
            try {
                const { data } = await refreshToken();
                if (data) {
                    token = data;
                    console.log("API CLIENT: Token refreshed", token);
                    localStorage.setItem("token", JSON.stringify(token));
                }
            } catch (error) {
                console.error("Failed to refresh token:", error);
                return Promise.reject(error);
            }
        }

        config.headers.Authorization = "Bearer " + token;
        config.headers.withCredentials = true;
    }
    return config;
};

apiClient.interceptors.request.use(addAuthorizationHeader, (error) =>
    Promise.reject(error)
);

export { apiClient };

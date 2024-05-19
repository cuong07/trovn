import { UserV1 } from "../constants/endpoints"
import { apiClient } from "./apiClient"
import qs from "query-string"

export const register = async (data) => {
    const url = qs.stringifyUrl({
        url: UserV1.CREATE_USER,
    })
    const user = await apiClient.post(url, data);
    return user.data;
}

export const login = async (data) => {
    const url = qs.stringifyUrl({
        url: UserV1.USER_LOGIN,
    })
    const user = await apiClient.post(url, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    return user.data;
}

export const getUser = async (id) => {
    const url = `/user/${id}`;
    const user = await apiClient.get(url);
    return user.data;
}

export const getCurrentUser = async () => {
    const url = '/user';
    const token = localStorage.getItem('authToken');
    const user = await apiClient.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return user;
}
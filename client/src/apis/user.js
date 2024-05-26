import { UserV1 } from "../constants/endpoints";
import useUserStore from "../hooks/userStore";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const register = async (data) => {
  const url = qs.stringifyUrl({
    url: UserV1.CREATE_USER,
  });
  const user = await apiClient.post(url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return user.data;
};

export const getCurrentUser = async () => {
  try {
    const url = qs.stringifyUrl({
      url: UserV1.GET_CURRENT_USER,
    });
    const { data } = await apiClient.get(url);
    useUserStore.setState((prev) => ({
      ...prev,
      user: data.data,
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (data) => {
  const url = qs.stringifyUrl({
    url: UserV1.USER_LOGIN,
  });
  const user = await apiClient.post(url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  useUserStore.setState((prev) => ({
    ...prev,
    token: user.data.data,
  }));
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  return user.data;
};

export const getListingByUserId = async (userId) => {
  const url = `listing/user/${userId}`;
  const listings = await apiClient.get(url);
  return listings.data.data;
};

export const getFavoriteListing = async (userId) => {
  const url = `/favorite/user/${userId}`;
  const favoriteListing = await apiClient.get(url);
  return favoriteListing.data.data;
};

export const getUser = async (id) => {
  const url = `/user/${id}`;
  const { data } = await apiClient.get(url);
  useUserStore.setState((prev) => ({
    ...prev,
    user: data.data,
  }));
  return data;
};

export const getEmailOtp = async () => {
  const url = qs.stringifyUrl({
    url: UserV1.GET_USER_OTP,
  });

  const { data } = await apiClient.get(url);
  return data;
};

export const getVerifyEmailOtp = async () => {
  const url = qs.stringifyUrl({
    url: UserV1.GET_VERIFY_EMAIL_OTP,
  });
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));

  const value = {
    email: useUserStore.getState().user.email,
    otp: useUserStore.getState().otp,
  };

  const { data } = await apiClient.post(url, value);
  return data;
};

// export const getCurrentUser = async ()=>{
//     const url = '/user';
//     const token = localStorage.getItem('authToken');
//     const user = await apiClient.get(url, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });
//     return user;
// }

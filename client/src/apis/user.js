import { UserV1 } from "@/constants/endpoints";
import useUserStore from "@/hooks/userStore";
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
    try {
        const user = await apiClient.post(url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        useUserStore.setState((prev) => ({
            ...prev,
            token: user.data.data,
        }));
        localStorage.setItem("token", JSON.stringify(user.data.data));
        console.log("APIS user: ", user);
        return user.data;
    } catch (error) {
        console.log("APIS error", error.response.data);
        return error.response.data;
    }

    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    return user.data;
};

export const getListingByUserId = async (userId) => {
    const url = `listing/user/${userId}`;
    const listings = await apiClient.get(url);
    return listings.data;
};

export const getFavoriteListing = async (userId) => {
    const url = `/favorite/user/${userId}`;
    const favoriteListing = await apiClient.get(url);
    return favoriteListing.data.data;
};

export const getUser = async (id) => {
    const url = `/user/${id}`;
    const { data } = await apiClient.get(url);
    return data.data;
};

export const getUsers = async () => {
    try {
        const url = qs.stringifyUrl({
            url: UserV1.GET_USERS,
        });
        const { data } = await apiClient.get(url);
        return data.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const url = `/user/email/${email}`;
        const { data } = await apiClient.get(url);
        return data.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Không tìm thấy user");
        } else {
            console.error("Lỗi khi gọi API:", error);
        }
    }
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

export const sendEmail = async (data) => {
    const url = `/user/email/${data.email}`;
    const dt = await apiClient.post(url, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return data;
};

export const changePassword = async (id, password) => {
    console.log("APIS changepasss data:", id, password);
    const url = `/user/${id}/forgot`;
    const dt = await apiClient.put(
        url,
        { password: password },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return dt;
};

export const updateLatLngUser = async (lat, lng) => {
    try {
        const { user } = useUserStore.getState();
        const url = qs.stringifyUrl({
            url: UserV1.UPDATE_USER + user?.id,
        });

        const { data } = await apiClient.put(url, {
            latitude: lat,
            longitude: lng,
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateUser = async (userData) => {
    try {
        const { user } = useUserStore.getState();
        const url = qs.stringifyUrl({
            url: UserV1.UPDATE_USER + user?.id,
        });

        const { data } = await apiClient.put(url, userData);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateUserAvatar = async (file) => {
    try {
        const { user } = useUserStore.getState();
        const url = qs.stringifyUrl({
            url: UserV1.UPDATE_USER_AVATAR + user?.id,
        });

        const { data } = await apiClient.put(url, { file });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
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

import { ReviewV1 } from "@/constants/endpoints";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const createReview = async (value) => {
    const url = qs.stringifyUrl({
        url: ReviewV1.CREATE_REVIEWS,
    });
    const { data } = await apiClient.post(url, value);
    return data;
};

export const getReviews = async (id) => {
    const url = qs.stringifyUrl({
        url: ReviewV1.GET_REVIEWS,
        query: {
            listingId: id,
            page: 1,
            limit: 20,
        },
    });
    const { data } = await apiClient.get(url);
    return data;
};

export const deleteReview = async (id) => {
    try {
        const url = qs.stringifyUrl({
            url: ReviewV1.DELETE_REVIEWS + id,
        });
        await apiClient.delete(url);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

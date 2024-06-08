import { FavoriteV1 } from "@/constants/endpoints";
import useFavoriteStore from "@/hooks/useFavoriteStore";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const createFavorite = async (listingId) => {
  const url = qs.stringifyUrl({
    url: FavoriteV1.CREATE_FAVORITE,
  });
  const res = await apiClient.post(url, {
    listingId,
  });
  return res.data;
};

export const getFavorites = async () => {
  try {
    const url = qs.stringifyUrl({
      url: FavoriteV1.GET_FAVORITES,
    });
    const { data } = await apiClient.get(url);
    useFavoriteStore.setState((prev) => {
      return {
        ...prev,
        favorites: data.data,
      };
    });
    return data;
  } catch (error) {
    console.log("GET_FAVORITES", error);
  }
};

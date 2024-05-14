import { ListingV1 } from "../constants/endpoints";
import useListingStore from "../hooks/useListingStore";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getListings = async () => {
  const {
    pagination: { page, limit },
    filter: { keyword },
  } = useListingStore.getState().listings;
  const url = qs.stringifyUrl({
    url: ListingV1.GET_LISTING,
    query: {
      page,
      limit,
      keyword,
    },
  });
  const { data } = await apiClient.get(url);
  return data;
};

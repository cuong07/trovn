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
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));

  const { data } = await apiClient.get(url);
  return data;
};

export const getFilterListing = async () => {};

export const getListing = async (id) => {
  const url = qs.stringifyUrl({
    url: ListingV1.GET_LISTING_BY_ID + id,
  });

  const { data } = await apiClient.get(url);
  return data;
};

export const createListing = async (value) => {
  const url = `${ListingV1.CREATE_LISTING}`;
  const formData = new FormData();

  // Append your form fields to the FormData object
  for (const [key, val] of Object.entries(value)) {
    formData.append(key, val);
  }

  try {
    const { data } = await apiClient.post(url, formData);
    return data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

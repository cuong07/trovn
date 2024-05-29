import { ListingV1 } from "../constants/endpoints";
import useListingStore from "../hooks/useListingStore";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getListings = async () => {
  const {
    pagination: { page, limit },
    filter: { keyword, amenityIds },
  } = useListingStore.getState().listings;

  const url = qs.stringifyUrl({
    url: ListingV1.GET_LISTING,
    query: {
      page,
      limit,
      amenityIds: amenityIds?.join(","),
    },
  });
  useListingStore.setState((prev) => ({
    ...prev,
    listings: {
      ...prev.listings,
      isLoading: true,
    },
  }));
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const { data } = await apiClient.get(url);

  useListingStore.setState((prev) => ({
    ...prev,
    listings: {
      ...prev.listings,
      isLoading: false,
    },
  }));

  useListingStore.setState((prev) => ({
    ...prev,
    listings: {
      ...prev.listings,
      totalElement: data.data.totalElement,
      currentPage: data.data.currentPage,
      totalPage: data.data.totalPage,
      contents: data.data.contents,
    },
  }));

  const { success, message } = data;

  return message, success;
};

export const adminGetListings = async () => {
  const {
    pagination: { page, limit },
    filter: { keyword, amenityIds },
  } = useListingStore.getState().adminListings;

  const url = qs.stringifyUrl({
    url: ListingV1.GET_LISTING,
    query: {
      page,
      limit,
      amenityIds: amenityIds?.join(","),
    },
  });
  useListingStore.setState((prev) => ({
    ...prev,
    adminListings: {
      ...prev.adminListings,
      isLoading: true,
    },
  }));
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const { data } = await apiClient.get(url);

  useListingStore.setState((prev) => ({
    ...prev,
    adminListings: {
      ...prev.adminListings,
      isLoading: false,
    },
  }));

  useListingStore.setState((prev) => ({
    ...prev,
    adminListings: {
      ...prev.adminListings,
      totalElement: data.data.totalElement,
      currentPage: data.data.currentPage,
      totalPage: data.data.totalPage,
      contents: data.data.contents,
    },
  }));

  const { success, message } = data;

  return message, success;
};

export const getHostListings = async () => {
  const {
    pagination: { page, limit },
  } = useListingStore.getState().hostListings;

  const url = qs.stringifyUrl({
    url: ListingV1.GET_LISTING,
    query: {
      page,
      limit,
      query: "",
    },
  });

  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));

  const { data } = await apiClient.get(url);
  return data;
};

export const getFilterListing = async () => {
  const {
    pagination: { page, limit },
    filter: {
      keyword,
      minPrice,
      maxPrice,
      locationId,
      tagId,
      amenityIds,
      latCoords,
      lngCoords,
    },
  } = useListingStore.getState().searchListings;
  const url = qs.stringifyUrl({
    url: ListingV1.GET_LISTING,
    query: {
      page,
      limit,
      keyword,
      latCoords,
      lngCoords,
      minPrice,
      maxPrice,
      locationId,
      tagId,
      amenityIds: amenityIds?.join(),
    },
  });
  useListingStore.setState((prev) => ({
    ...prev,
    searchListings: {
      ...prev.searchListings,
      isLoading: true,
    },
  }));
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  const { data } = await apiClient.get(url);
  useListingStore.setState((prev) => ({
    ...prev,
    searchListings: {
      ...prev.searchListings,
      isLoading: false,
    },
  }));
  useListingStore.setState((prev) => ({
    ...prev,
    searchListings: {
      ...prev.searchListings,
      contents: data.data.contents,
      currentPage: data?.data.currentPage,
      totalElements: data?.data.totalElement,
    },
  }));
  return data;
};

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

  for (const [key, val] of Object.entries(value)) {
    if (Array.isArray(val)) {
      if (key === "files") {
        val.forEach((file) => {
          formData.append(key, file);
        });
      } else if (key === "amenityConnections") {
        formData.append(key, val);
      } else if (key === "tags") {
        formData.append(key, val.join(","));
      }
    } else {
      formData.append(key, val);
    }
  }

  try {
    const { data } = await apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

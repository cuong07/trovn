import { AmenityV1 } from "../constants/endpoints";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getAllAmenity = async () => {
  const url = qs.stringifyUrl({
    url: AmenityV1.GET_ALL_AMENITY,
  });
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const res = await apiClient.get(url);
  return res.data;
};

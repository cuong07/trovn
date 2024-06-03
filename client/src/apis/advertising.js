import { AdvertisingV1 } from "@/constants/endpoints";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getAdvertisingPackages = async () => {
  const url = qs.stringifyUrl({
    url: AdvertisingV1.GET_ALL_ADVERTISING,
  });
  const res = await apiClient.get(url);
  return res.data;
};

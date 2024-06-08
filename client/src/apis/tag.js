import { TagV1 } from "@/constants/endpoints";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getAllTags = async () => {
  const url = qs.stringifyUrl({
    url: TagV1.GET_TAGS,
  });
  const { data } = await apiClient.get(url);
  return data;
};

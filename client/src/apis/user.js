import { UserV1 } from "../constants/endpoints";
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

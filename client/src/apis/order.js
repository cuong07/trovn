import { OrderV1 } from "../constants/endpoints";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getOrdersByCurrentUser = async () => {
  const url = qs.stringifyUrl({
    url: OrderV1.GET_ORDERS_BY_USER,
  });
  const res = await apiClient.get(url);
  return res.data;
};

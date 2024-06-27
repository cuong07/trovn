import { BannerV1 } from "@/constants/endpoints";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const createBanner = async (data) => {
  const url = qs.stringifyUrl({
    url: BannerV1.CREATE_BANNER,
  });
  const formData = new FormData();

  for (const [key, val] of Object.entries(data)) {
    if (key === "file") {
      const fileBinary = new Blob([val], { type: "application/octet-stream" });
      formData.append(key, fileBinary);
    }
    formData.append(key, val);
  }
  const res = await apiClient.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getBannerActive = async () => {
  const url = qs.stringifyUrl({
    url: BannerV1.GET_BANNERS_ACTIVE,
  });
  const { data } = await apiClient.get(url);
  return data;
};
export const getAllBanners = async () => {
  const url = qs.stringifyUrl({
    url: BannerV1.GET_BANNERS,
  });
  const { data } = await apiClient.get(url);
  return data;
};
export const updateBannerStatus = async (bannerId, status) => {
  const url = `${BannerV1.UPDATE_BANNER_STATUS}/${bannerId}/block`;
  const { data } = await apiClient.patch(url, { status });
  return data;
};




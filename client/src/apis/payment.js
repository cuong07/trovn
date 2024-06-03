import { PaymentV1 } from "@/constants/endpoints";
import useUserStore from "@/hooks/userStore";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getPaymentMomo = async () => {
  const adsPackage = useUserStore.getState().adsPackage;

  if (adsPackage) {
    const url = qs.stringifyUrl({
      url: PaymentV1.GET_MOMO_PAYMENT,
      query: {
        amount: adsPackage.price,
        orderInfo: adsPackage.name,
        adsPackageId: adsPackage.id,
      },
    });
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const res = await apiClient.get(url);
    return res.data;
  } else {
    console.error("Không tìm thấy gói ");
  }
};

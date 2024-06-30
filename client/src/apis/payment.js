import { PaymentV1 } from "@/constants/endpoints";
import useUserStore from "@/hooks/userStore";
import { apiClient } from "./apiClient";
import qs from "query-string";

export const getPaymentMomo = async (requestType) => {
    const adsPackage = useUserStore.getState().adsPackage;
    console.log(requestType);
    if (adsPackage) {
        const url = qs.stringifyUrl({
            url: PaymentV1.GET_MOMO_PAYMENT,
            query: {
                amount: adsPackage.price,
                orderInfo: adsPackage.name,
                adsPackageId: adsPackage.id,
                requestType,
            },
        });
        // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        const res = await apiClient.get(url);
        return res.data;
    } else {
        console.error("Không tìm thấy gói ");
    }
};

export const getPaymentVNPay = async () => {
    const adsPackage = useUserStore.getState().adsPackage;
    if (adsPackage) {
        const url = qs.stringifyUrl({
            url: PaymentV1.GET_VNPAY_PAYMENT,
            query: {
                amount: adsPackage.price,
                orderInfo: adsPackage.name,
                adsPackageId: adsPackage.id,
                locale: "vi",
            },
        });
        // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        const res = await apiClient.get(url);
        return res.data;
    } else {
        console.error("Không tìm thấy gói ");
    }
};

export const getPaymentsByStatus = async (status) => {
    const url = qs.stringifyUrl({
        url: PaymentV1.GET_PAYMENTS_BY_STATUS,
        query: {
            status,
        },
    });
    const { data } = await apiClient.get(url);
    return data;
};

export const deletePayment = async (id) => {
    const url = qs.stringifyUrl({
        url: PaymentV1.DELETE_PAYMENT + id,
    });
    const { data } = await apiClient.delete(url);
    return data;
};

export const getPaymentByUser = async () => {
    const url = qs.stringifyUrl({
        url: PaymentV1.GET_PAYMENT_USER,
    });
    const { data } = await apiClient.get(url);
    return data;
};

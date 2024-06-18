const NGROK_URL =
    "https://e1ba-2001-ee0-4f87-52d0-8a45-7c4-3fce-e88f.ngrok-free.app";

export const MomoConfig = {
    accessKey: process.env.MOMO_ACCESS_KEY,
    secretKey: process.env.MOMO_SECRET_KEY,
    partnerCode: "MOMO",
    redirectUrl: "http://localhost:5173/payment/momo",
    ipnUrl: NGROK_URL + "/api/v1/payment/momo/callback",
    requestType: "payWithMethod",
    extraData: "",
    orderGroupId: "",
    autoCapture: true,
    lang: "vi",
};

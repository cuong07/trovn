const NGROK_URL =
    "https://0022-2402-800-79c2-4914-957d-40ec-96fb-34ad.ngrok-free.app";

export const MomoConfig = {
    accessKey: process.env.MOMO_ACCESS_KEY,
    secretKey: process.env.MOMO_SECRET_KEY,
    partnerCode: "MOMO",
    redirectUrl: "http://localhost:8888/views/home.html",
    ipnUrl: NGROK_URL + "/api/v1/payment/momo/callback",
    requestType: "payWithMethod",
    extraData: "",
    orderGroupId: "",
    autoCapture: true,
    lang: "vi",
};

const NGROK_URL = "https://a29d-118-69-108-79.ngrok-free.app";

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

const NGROK_URL = "https://6771-14-224-147-129.ngrok-free.app";

export const MomoConfig = {
    accessKey: process.env.MOMO_ACCESS_KEY,
    secretKey: process.env.MOMO_SECRET_KEY,
    partnerCode: "MOMO",
    redirectUrl: "http://localhost:5173/payment/momo",
    ipnUrl: NGROK_URL + "/api/v1/payment/momo/callback",
    requestType: "captureWallet",
    extraData: "",
    orderGroupId: "",
    autoCapture: true,
    lang: "vi",
};

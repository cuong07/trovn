const NGROK_URL = "https://20ff-118-69-108-79.ngrok-free.app";

export const MomoConfig = {
    accessKey: process.env.MOMO_ACCESS_KEY,
    secretKey: process.env.MOMO_SECRET_KEY,
    partnerCode: "MOMO",
    partnerName: "TROVN",
    redirectUrl: "http://localhost:5173/payment/momo",
    ipnUrl: NGROK_URL + "/api/v1/payment/momo/callback",
    // requestType: "linkWallet",
    // requestType: "",
    extraData: "",
    orderGroupId: "",
    autoCapture: true,
    lang: "vi",
};

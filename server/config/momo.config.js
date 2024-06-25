const NGROK_URL =
    "https://b175-2001-ee0-4f87-52d0-3632-7eb-d271-3d72.ngrok-free.app";

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

const NGROK_URL =
  "https://cde3-2001-ee0-4f85-6cd0-85cb-8828-cb16-ccb4.ngrok-free.app";

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

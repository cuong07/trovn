const NGROK_URL =
  "https://4c25-2001-ee0-4f85-6cd0-84fe-4fc0-3fab-d595.ngrok-free.app";

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

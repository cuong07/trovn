const NGROK_URL =
  "https://cf57-2001-ee0-4f85-6cd0-dc94-bc9e-cba2-8ed7.ngrok-free.app";

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

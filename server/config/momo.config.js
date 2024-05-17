export const MomoConfig = {
  accessKey: process.env.MOMO_ACCESS_KEY,
  secretKey: process.env.MOMO_SECRET_KEY,
  partnerCode: "MOMO",
  redirectUrl: "http://localhost:8888/views/home.html",
  ipnUrl:
    "https://dca0-118-69-108-79.ngrok-free.app/api/v1/payment/momo/callback", //chú ý: cần dùng ngrok thì momo mới post đến url này được
  requestType: "payWithMethod",
  extraData: "",
  orderGroupId: "",
  autoCapture: true,
  lang: "vi",
};

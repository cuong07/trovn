export const MomoConfig = {
  accessKey: process.env.MOMO_ACCESS_KEY,
  secretKey: process.env.MOMO_SECRET_KEY,
  partnerCode: "MOMO",
  redirectUrl: "http://localhost:8888/views/home.html",
  ipnUrl:
    "https://4010-2001-ee0-5044-2590-72aa-104-aa44-e806.ngrok-free.app/api/v1/payment/momo/callback", //chú ý: cần dùng ngrok thì momo mới post đến url này được
  requestType: "payWithMethod",
  extraData: "",
  orderGroupId: "",
  autoCapture: true,
  lang: "vi",
};

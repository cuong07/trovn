import nodeMailer from "nodemailer";
import { mailConfig } from "../config/mail.config.js";

export const sendMail = (to, subject, otp) => {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email OTP Template</title>
    </head>
    <body style="font-family: sans-serif;">
      <h1 style="color: #FFA900; font-size: 32px' font-weight: 600;">PHÒNG TRỌ VN</h1>
      <hr style="height: 8px; background-color: #ccc;  border: none" />
      <p>Xin chào <strong>${to},</strong></p>
      <p>Xin vui lòng nhập mã này để xác minh địa chỉ email của bạn.</p>
      <p>Lưu ý, không được chia sẻ OTP với bất kì ai</p>
      <div style="display: flex; justify-content: center;">
        <div style="border-radius: 8px; padding: 8px 18px; font-size: 32px; font-weight: 600; color: #fff; background-color: #00466A">${otp}</div>
      </div>
      <p>Mạnh Cường,</p>
      <p>Nhóm <strong>TROVN</strong></p>
      <hr style="height: 8px; background-color: #ccc;  border: none""/>
    </body>
  </html>
  `;

  const transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });

  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: template,
  };
  return transport.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email xác minh đã được gửi:", info.response);
    }
  });
};

import nodeMailer from "nodemailer";
import { mailConfig } from "../config/mail.config.js";

export const sendMail = (to, subject, template) => {
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

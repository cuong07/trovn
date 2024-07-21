import nodeMailer from "nodemailer";
import { mailConfig } from "../config/mail.config.js";
import { logger } from "../config/winston.js";

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
            logger.error(error);
        } else {
            logger.info("Email xác minh đã được gửi:", info.response);
        }
    });
};

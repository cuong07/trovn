import twilio from "twilio";
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
export const sendPhone = (phone, content) => {
    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+84${phone}`,
        })
        .then((message) => console.log(message.sid))
        .done();
};

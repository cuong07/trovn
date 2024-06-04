import { MomoConfig } from "../config/momo.config.js";
import qs from "query-string";
import PaymentService from "../services/payment.service.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import axios from "axios";
import { orderIdGenerator } from "../utils/otp.utils.js";
import { statusCode } from "../config/statusCode.js";
import crypto from "crypto";
import { sendMail } from "../utils/mailer.utils.js";
import { orderTemplate } from "../utils/order.template.utils.js";
import { ZaloPayConfig } from "../config/zalo.config.js";
import moment from "moment";
import CryptoJS from "crypto-js";

const PaymentController = {
    async createMomoPayment(req, res) {
        const { amount, orderInfo, adsPackageId } = req.query;
        const { id } = req.user;
        console.log(amount, orderInfo);
        try {
            let {
                accessKey,
                secretKey,
                partnerCode,
                redirectUrl,
                ipnUrl,
                requestType,
                extraData,
                orderGroupId,
                autoCapture,
                lang,
            } = MomoConfig;

            var orderId = partnerCode + orderIdGenerator(8);
            var requestId = orderId;

            var rawSignature =
                "accessKey=" +
                accessKey +
                "&amount=" +
                amount +
                "&extraData=" +
                adsPackageId +
                "&ipnUrl=" +
                ipnUrl +
                "&orderId=" +
                orderId +
                "&orderInfo=" +
                orderInfo +
                "&partnerCode=" +
                partnerCode +
                "&redirectUrl=" +
                redirectUrl +
                "&requestId=" +
                requestId +
                "&requestType=" +
                requestType;

            var signature = crypto
                .createHmac("sha256", secretKey)
                .update(rawSignature)
                .digest("hex");

            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                partnerName: "Test",
                storeId: "MomoTestStore",
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                lang: lang,
                requestType: requestType,
                autoCapture: autoCapture,
                extraData: adsPackageId,
                orderGroupId: orderGroupId,
                signature: signature,
            });

            const options = {
                method: "POST",
                url: "https://test-payment.momo.vn/v2/gateway/api/create",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(requestBody),
                },
                data: requestBody,
            };

            let newMomoPayment = {
                amount: parseFloat(amount),
                status: false,
                provider: "MOMO",
                note: orderInfo,
                transactionId: orderId,
                userId: id,
            };

            const { data } = await axios(options);
            await PaymentService.createPayment(newMomoPayment);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async callbackMomo(req, res) {
        const data = req.body;
        const list = Object.entries(data).map(([key, value]) => ({
            name: key,
            value,
        }));

        try {
            const { resultCode, orderId } = data;
            const status = resultCode === 0;
            const { user } = await PaymentService.getUserForTransactionId(
                orderId
            );
            const { email } = user;
            const template = orderTemplate(email, list);
            const subject =
                resultCode === 0
                    ? "THANH TOÁN THÀNH CÔNG"
                    : "THANH TOÁN KHÔNG THÀNH CÔNG";

            sendMail(email, subject, template);

            const payment = await PaymentService.updatePaymentActive(
                status,
                user,
                data
            );
            return payment;
        } catch (error) {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async getMomoStatusTransaction(req, res) {
        const { orderId } = req.query;
        try {
            const { accessKey, secretKey } = MomoConfig;
            const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

            const signature = crypto
                .createHmac("sha256", secretKey)
                .update(rawSignature)
                .digest("hex");

            const requestBody = JSON.stringify({
                partnerCode: "MOMO",
                requestId: orderId,
                orderId: orderId,
                signature: signature,
                lang: "vi",
            });

            const options = {
                method: "POST",
                url: "https://test-payment.momo.vn/v2/gateway/api/query",
                headers: {
                    "Content-Type": "application/json",
                },
                data: requestBody,
            };

            const { data } = await axios(options);

            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async createZaloPayPayment(req, res) {
        const { amount, orderInfo, adsPackageId } = req.query;
        const { id } = req.user;

        const embed_data = {
            redirecturl: "http://localhost:5173/host/ads-package",
            adsPackageId,
            orderInfo,
        };

        const items = [];
        const transID = Math.floor(Math.random() * 1000000);

        let orderId = `${moment().format("YYMMDD")}_${transID}`;

        const order = {
            app_id: ZaloPayConfig.app_id,
            app_trans_id: orderId, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount,
            //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
            //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
            callback_url: ZaloPayConfig.callback_url,
            description: ` Payment for the order #${transID}`,
            bank_code: "",
        };
        const data =
            ZaloPayConfig.app_id +
            "|" +
            order.app_trans_id +
            "|" +
            order.app_user +
            "|" +
            order.amount +
            "|" +
            order.app_time +
            "|" +
            order.embed_data +
            "|" +
            order.item;
        order.mac = CryptoJS.HmacSHA256(data, ZaloPayConfig.key1).toString();

        try {
            const { data } = await axios.post(ZaloPayConfig.endpoint, null, {
                params: order,
            });

            let newZaloPayment = {
                amount: parseFloat(amount),
                status: false,
                provider: "ZaloPay",
                note: orderInfo,
                transactionId: orderId,
                userId: id,
            };

            await PaymentService.createPayment(newZaloPayment);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async callBackZaloPay(req, res) {
        let result = {};
        console.log(req.body);
        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = CryptoJS.HmacSHA256(
                dataStr,
                ZaloPayConfig.key2
            ).toString();

            console.log("mac =", mac);
            let dataJson = JSON.parse(dataStr, ZaloPayConfig.key2);
            const orderId = dataJson["app_trans_id"];
            const { email } = user;

            const list = Object.entries(dataJson).map(([key, value]) => ({
                name: key,
                value,
            }));
            const template = orderTemplate(email, list);
            // kiểm tra callback hợp lệ (đến từ ZaloPay server)
            if (reqMac !== mac) {
                // callback không hợp lệ
                const subject = "THANH TOÁN KHÔNG THÀNH CÔNG";
                sendMail(email, subject, template);
                result.return_code = -1;
                result.return_message = "mac not equal";
            } else {
                const { user } = await PaymentService.getUserForTransactionId(
                    orderId
                );
                const subject = "THANH TOÁN THÀNH CÔNG";
                sendMail(email, subject, template);

                const payment = await PaymentService.updatePaymentActive(
                    status,
                    user,
                    data
                );

                result.return_code = 1;
                result.return_message = "success";

                return payment;
            }
        } catch (ex) {
            console.log("lỗi:::" + ex.message);
            result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
            result.return_message = ex.message;
        }

        // thông báo kết quả cho ZaloPay server
        res.json(result);
    },
};

export default PaymentController;

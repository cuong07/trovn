import qs from "query-string";
import axios from "axios";
import crypto from "crypto";
import moment from "moment";
import CryptoJS from "crypto-js";
import queryString from "query-string";

import { MomoConfig } from "../config/momo.config.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import PaymentService from "../services/payment.service.js";
import { orderIdGenerator } from "../utils/otp.utils.js";
import { statusCode } from "../config/statusCode.js";
import { sendMail } from "../utils/mailer.utils.js";
import { orderTemplate } from "../utils/order.template.utils.js";
import { ZaloPayConfig } from "../config/zalo.config.js";
import { VNPayConfig } from "../config/vnpay.config.js";
import { sortObject } from "../utils/sort.object.utils.js";
import { logger } from "../config/winston.js";

const PaymentController = {
    async getPaymentsByUser(req, res) {
        const { id } = req.user;
        try {
            if (!id) {
                return res
                    .status(statusCode.BAD_REQUEST)
                    .json(BaseResponse.error("Vui lòng đăng nhập", error));
            }
            const data = await PaymentService.findByUser(id);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    /***
     * MOMO
     */
    async createMomoPayment(req, res) {
        const { amount, orderInfo, adsPackageId, requestType } = req.query;
        const { id } = req.user;

        try {
            let {
                accessKey,
                secretKey,
                partnerCode,
                redirectUrl,
                ipnUrl,
                // requestType,
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

            logger.info("Momo options: ", options);

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

    /***
     * ZALO PAY
     */
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
        logger.info(req.body);
        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = CryptoJS.HmacSHA256(
                dataStr,
                ZaloPayConfig.key2
            ).toString();

            let dataJson = JSON.parse(dataStr, ZaloPayConfig.key2);
            const orderId = dataJson["app_trans_id"];
            const { email } = user;

            const list = Object.entries(dataJson).map(([key, value]) => ({
                name: key,
                value,
            }));
            const template = orderTemplate(email, list);
            if (reqMac !== mac) {
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
            logger.error(ex);
            result.return_code = 0;
            result.return_message = ex.message;
        }

        res.json(result);
    },

    async getPaymentsByStatus(req, res) {
        try {
            const { status } = req.query;
            const data = await PaymentService.getPaymentStatus(status);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async deletePayment(req, res) {
        try {
            const { id } = req.params;
            const data = await PaymentService.deletePayment(id);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    /***
     * VNPAY
     */

    async createVNPayPayment(req, res) {
        let { amount, locale, orderInfo, bankCode, adsPackageId } = req.query;
        const { id } = req.user;

        process.env.TZ = "Asia/Ho_Chi_Minh";

        let date = new Date();
        let createDate = moment(date).format("YYYYMMDDHHmmss");

        let ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let tmnCode = VNPayConfig.vnp_TmnCode;
        let secretKey = VNPayConfig.vnp_HashSecret;
        let vnpUrl = VNPayConfig.vnp_Url;
        let returnUrl = VNPayConfig.vnp_ReturnUrl;
        let orderId = moment(date).format("DDHHmmss");
        let currCode = "VND";
        let vnp_Params = {};

        if (locale === null || locale === "") {
            locale = "vn";
        }

        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params["vnp_OrderInfo"] = adsPackageId;
        vnp_Params["vnp_OrderType"] = "other";
        vnp_Params["vnp_Amount"] = amount * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== undefined && bankCode !== "") {
            vnp_Params["vnp_BankCode"] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);
        let signData = queryString.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + queryString.stringify(vnp_Params, { encode: false });

        try {
            let newPayment = {
                amount: parseFloat(amount),
                status: false,
                provider: "VNPAY",
                note: orderInfo,
                transactionId: orderId,
                userId: id,
            };

            const payment = await PaymentService.createPayment(newPayment);
            logger.info(vnpUrl);
            return res.status(statusCode.OK).json(
                BaseResponse.success("Thành công", {
                    url: vnpUrl,
                    code: "00",
                })
            );
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async callBackVNPayPayment(req, res) {
        let vnp_Params = req.query;
        let secureHash = vnp_Params["vnp_SecureHash"];

        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);

        let tmnCode = VNPayConfig.vnp_TmnCode;
        let secretKey = VNPayConfig.vnp_HashSecret;

        let signData = queryString.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            res.json({ code: vnp_Params["vnp_ResponseCode"], success: true });
        } else {
            res.json({ code: "97", success: false });
        }
    },

    async callbackVNPayIPN(req, res) {
        try {
            let vnp_Params = req.query;
            let secureHash = vnp_Params["vnp_SecureHash"];

            let orderId = vnp_Params["vnp_TxnRef"];
            let rspCode = vnp_Params["vnp_ResponseCode"];
            let orderInfo = vnp_Params["vnp_OrderInfo"];
            delete vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHashType"];

            vnp_Params = sortObject(vnp_Params);
            let secretKey = VNPayConfig.vnp_HashSecret;
            let signData = queryString.stringify(vnp_Params, { encode: false });
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac
                .update(new Buffer(signData, "utf-8"))
                .digest("hex");
            const amount = parseFloat(vnp_Params["vnp_Amount"]) / 100;

            const payment = await PaymentService.getPaymentByTransactionId(
                orderId
            );
            const { user } = await PaymentService.getUserForTransactionId(
                orderId
            );

            let paymentStatus = payment.status; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.

            // TODO: Check order and amount
            let checkOrderId = payment.transactionId === orderId; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
            let checkAmount = payment.amount === amount; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
            logger.info("amount: ", amount);
            /**
             * EMAIL
             */
            let subject = "";
            const { email } = user;

            const list = Object.entries(vnp_Params).map(([key, value]) => ({
                name: key,
                value,
            }));

            const template = orderTemplate(email, list);
            let vnp_BankTranNo = vnp_Params["vnp_BankTranNo"];
            if (secureHash === signed) {
                //kiểm tra checksum
                if (checkOrderId) {
                    if (checkAmount) {
                        if (!paymentStatus) {
                            //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                            const data = {
                                amount,
                                orderId,
                                extraData: orderInfo,
                            };
                            logger.info(data);
                            if (rspCode == "00") {
                                //thanh cong
                                subject = "THANH TOÁN THÀNH CÔNG";
                                //paymentStatus = '1'
                                logger.info(user, data);
                                // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                                const payment =
                                    await PaymentService.updatePaymentActive(
                                        true,
                                        user,
                                        data
                                    );

                                logger.info(subject);
                                res.status(statusCode.OK).json(
                                    BaseResponse.success("Thành công", {
                                        code: "00",
                                        payment,
                                    })
                                );
                            } else {
                                //that bai
                                subject = "THANH TOÁN KHÔNG THÀNH CÔNG";
                                //paymentStatus = '2'
                                // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                                const payment =
                                    await PaymentService.updatePaymentActive(
                                        false,
                                        user,
                                        data
                                    );

                                logger.info(subject);
                                res.status(statusCode.OK).json(
                                    BaseResponse.success(
                                        "Giao dịch không thành công",
                                        {
                                            code: "00",
                                            payment,
                                        }
                                    )
                                );
                            }
                        } else {
                            subject =
                                "Đơn hàng này đã được cập nhật trạng thái thanh toán";
                            logger.info(subject);
                            res.status(statusCode.OK).json(
                                BaseResponse.success(
                                    "Đơn hàng này đã được cập nhật trạng thái thanh toán",
                                    { code: "02" }
                                )
                            );
                        }
                    } else {
                        subject = "Số tiền không hợp lệ";
                        logger.info(subject);

                        res.status(statusCode.OK).json(
                            BaseResponse.success("Số tiền không hợp lệ", {
                                code: "04",
                            })
                        );
                    }
                } else {
                    subject = "Không tìm thấy đơn hàng";
                    logger.info(subject);

                    res.status(statusCode.OK).json(
                        BaseResponse.success("Không tìm thấy đơn hàng", {
                            code: "01",
                        })
                    );
                }
            } else {
                subject = "Tổng kiểm tra không thành công";
                logger.info(subject);

                res.status(statusCode.OK).json(
                    BaseResponse.success("Tổng kiểm tra không thành công", {
                        code: "97",
                    })
                );
            }
            sendMail(email, subject, template);
        } catch (error) {
            logger.error(error);
            res.status(statusCode.BAD_REQUEST).json(
                BaseResponse.success(error.message, {
                    code: "97",
                    error: error,
                })
            );
        }
    },
};

export default PaymentController;

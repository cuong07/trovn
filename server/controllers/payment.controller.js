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
      const { user } = await PaymentService.getUserForTransactionId(orderId);
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
};

export default PaymentController;

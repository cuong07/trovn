import express from "express";
import PaymentController from "../controllers/payment.controller.js";
import {
    verifyTokenAllRole,
    verifyTokenWithAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/payment/user",
    verifyTokenAllRole,
    PaymentController.getPaymentsByUser
);
router.get(
    "/payment/momo",
    verifyTokenAllRole,
    PaymentController.createMomoPayment
);
router.post("/payment/momo/callback", PaymentController.callbackMomo);
router.get(
    "/payment/momo/check-status-transaction",
    PaymentController.getMomoStatusTransaction
);

router.get(
    "/payment/zalopay",
    verifyTokenAllRole,
    PaymentController.createZaloPayPayment
);
router.post("/payment/zalopay/callback", PaymentController.callBackZaloPay);
router.get(
    "/payments",
    verifyTokenWithAdmin,
    PaymentController.getPaymentsByStatus
);
router.delete(
    "/payment/:id",
    verifyTokenWithAdmin,
    PaymentController.deletePayment
);

router.get(
    "/payment/vnpay",
    verifyTokenAllRole,
    PaymentController.createVNPayPayment
);

router.get("/payment/vnpay/callback", PaymentController.callbackVNPayIPN);
export default router;

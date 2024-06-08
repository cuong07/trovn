import express from "express";
import PaymentController from "../controllers/payment.controller.js";
import { verifyTokenAllRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

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
export default router;

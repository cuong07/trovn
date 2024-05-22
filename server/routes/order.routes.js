import express from "express";

import { verifyTokenWithUserPremium } from "../middlewares/auth.middleware.js";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.get(
  "/orders",
  verifyTokenWithUserPremium,
  OrderController.getOrdersByUserId
);

export default router;

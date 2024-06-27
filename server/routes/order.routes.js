import express from "express";

import {
    verifyTokenAllRole,
    verifyTokenWithUserPremium,
} from "../middlewares/auth.middleware.js";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.get("/orders", verifyTokenAllRole, OrderController.getOrdersByUserId);

export default router;

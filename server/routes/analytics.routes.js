import express from "express";

import { verifyTokenWithAdmin } from "../middlewares/auth.middleware.js";
import AnalyticsController from "../controllers/analytics.controller.js";

const router = express.Router();

router.get(
    "/analytics/new-listing",
    verifyTokenWithAdmin,
    AnalyticsController.getOrdersByUserId
);

router.get(
    "/analytics/amount-payment",
    verifyTokenWithAdmin,
    AnalyticsController.getAmountPayment
);
router.get(
    "/analytics/new-user-register",
    verifyTokenWithAdmin,
    AnalyticsController.getCountNewUserRegister
);
router.get(
    "/analytics/top-user-with-most-listing",
    verifyTokenWithAdmin,
    AnalyticsController.getTop10UsersWithMostListings
);

router.get(
    "/analytics/location-count-listing",
    verifyTokenWithAdmin,
    AnalyticsController.getCountListingByLocationForChart
);

export default router;

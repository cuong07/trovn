import express from "express";

import { verifyTokenWithAdmin } from "../middlewares/auth.middleware.js";
import AdvertisingPackageController from "../controllers/advertising.package.controller.js";

const router = express.Router();

router.get("/advertising-packages", AdvertisingPackageController.getAdsPack);
router.post(
  "/advertising-package",
  verifyTokenWithAdmin,
  AdvertisingPackageController.createAdPackage,
);
router.delete(
  "/advertising-package/:id",
  verifyTokenWithAdmin,
  AdvertisingPackageController.deleteAdPackage,
);

export default router;

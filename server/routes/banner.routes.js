import express from "express";

import {
  verifyTokenAllRole,
  verifyTokenWithUserPremium,
} from "../middlewares/auth.middleware.js";
import BannerController from "../controllers/banner.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post(
  "/banner",
  verifyTokenWithUserPremium,
  upload.single("file"),
  BannerController.createBanners
);

router.get("/banners", BannerController.getBanners);
router.get("/banners/active", BannerController.getBannersActive);
router.get(
  "/banners/user",
  verifyTokenWithUserPremium,
  BannerController.getBannersByUser
);

// router.delete(
//   "/favorite/:id",
//   verifyTokenAllRole,
//   FavoriteController.deleteFavorite
// );

export default router;

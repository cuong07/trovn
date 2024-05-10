import express from "express";

import { verifyTokenAllRole } from "../middlewares/auth.middleware.js";
import FavoriteController from "../controllers/favorite.controller.js";

const router = express.Router();

router.post("/favorite", verifyTokenAllRole, FavoriteController.createFavorite);
router.get(
  "/favorite/user/:id",
  verifyTokenAllRole,
  FavoriteController.getFavoriteByUserId
);
router.delete(
  "/favorite/:id",
  verifyTokenAllRole,
  FavoriteController.deleteFavorite
);

export default router;

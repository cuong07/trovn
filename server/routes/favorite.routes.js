import express from "express";

import { verifyToken } from "../middlewares/auth.js";
import FavoriteController from "../controllers/favorite.contriller.js";

const router = express.Router();

router.post("/favorite", verifyToken, FavoriteController.createFavorite);
router.get(
  "/favorite/user/:id",
  verifyToken,
  FavoriteController.getFavoriteByUserId
);
router.delete("/favorite/:id", verifyToken, FavoriteController.deleteFavorite);

export default router;

import express from "express";

import { verifyToken, verifyTokenWidthAdmin } from "../middlewares/auth.js";
import AmenitieController from "../controllers/amenitie.controller.js";
import { upload } from "../config/multer.js";
import ImageController from "../controllers/image.controller.js";

const router = express.Router();

router.post("/image", verifyToken, ImageController.createImage);
router.delete("/image/:id", verifyToken, ImageController.deleteImage);
router.delete(
  "/image/listing/:id",
  verifyToken,
  ImageController.deleteImageByListingId
);

export default router;

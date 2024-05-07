import express from "express";

import {
  verifyTokenAllRole,
  verifyTokenWidthAdmin,
} from "../middlewares/auth.middleware.js";
import AmenitieController from "../controllers/amenitie.controller.js";
import { upload } from "../config/multer.js";
import ImageController from "../controllers/image.controller.js";

const router = express.Router();

router.post("/image", verifyTokenAllRole, ImageController.createImage);
router.delete("/image/:id", verifyTokenAllRole, ImageController.deleteImage);
router.delete(
  "/image/listing/:id",
  verifyTokenAllRole,
  ImageController.deleteImageByListingId
);

export default router;

import express from "express";

import { verifyTokenWithAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";
import AmenityController from "../controllers/amenity.controller.js";

const router = express.Router();

router.get("/amenities", AmenityController.getAllAmenity);
router.post(
  "/amenity",
  upload.single("file"),
  verifyTokenWithAdmin,
  AmenityController.createAmenity
);
router.put(
  "/amenity/:id",
  upload.single("file"),
  verifyTokenWithAdmin,
  AmenityController.updateAmenity
);
router.delete(
  "/amenity/:id",
  verifyTokenWithAdmin,
  AmenityController.deleteAmenity
);

export default router;

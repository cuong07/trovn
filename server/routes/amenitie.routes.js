import express from "express";

import { verifyTokenWidthAdmin } from "../middlewares/auth.js";
import AmenitieController from "../controllers/amenitie.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.get("/amenities", AmenitieController.getAllAmenitie);
router.post(
  "/amenitie",
  upload.single("file"),
  verifyTokenWidthAdmin,
  AmenitieController.createAmenitie
);
router.put(
  "/amenitie/:id",
  upload.single("file"),
  verifyTokenWidthAdmin,
  AmenitieController.updateAmenitie
);
router.delete(
  "/amenitie/:id",
  verifyTokenWidthAdmin,
  AmenitieController.deleteAmenitie
);

export default router;

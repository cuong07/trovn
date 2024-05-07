import express from "express";

import { verifyTokenWithAdmin } from "../middlewares/auth.middleware.js";
import AmenitieController from "../controllers/amenitie.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.get("/amenities", AmenitieController.getAllAmenitie);
router.post(
  "/amenitie",
  upload.single("file"),
  verifyTokenWithAdmin,
  AmenitieController.createAmenitie
);
router.put(
  "/amenitie/:id",
  upload.single("file"),
  verifyTokenWithAdmin,
  AmenitieController.updateAmenitie
);
router.delete(
  "/amenitie/:id",
  verifyTokenWithAdmin,
  AmenitieController.deleteAmenitie
);

export default router;

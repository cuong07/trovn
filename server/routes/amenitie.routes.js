import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import AmenitieController from "../controllers/amenitie.controller.js";
import { upload } from "../config/multer.js";
const router = express.Router();

router.get("/amenities", AmenitieController.getAllAmenitie);
router.post(
  "/amenitie",
  upload.single("file"),
  AmenitieController.createAmenitie
);
router.put(
  "/amenitie/:id",
  upload.single("file"),
  AmenitieController.updateAmenitie
);
router.delete("/amenitie/:id", AmenitieController.deleteAmenitie);

export default router;

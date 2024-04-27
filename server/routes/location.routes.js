import express from "express";

import { verifyTokenWidthAdmin } from "../middlewares/auth.js";
import LocationController from "../controllers/location.controller.js";

const router = express.Router();

router.get("/locations", LocationController.getAllLocation);

router.post(
  "/location",
  verifyTokenWidthAdmin,
  LocationController.createLocation
);

export default router;

import express from "express";

import { verifyTokenWithAdmin } from "../middlewares/auth.middleware.js";
import LocationController from "../controllers/location.controller.js";

const router = express.Router();

router.post(
  "/location",
  verifyTokenWithAdmin,
  LocationController.createLocation
);
router.get("/locations", LocationController.getAllLocation);
router.get("/location/:id", LocationController.getLocationById);
router.put(
  "/location/:id",
  verifyTokenWithAdmin,
  LocationController.udpateLocation
);
router.delete(
  "/location/:id",
  verifyTokenWithAdmin,
  LocationController.deleteLocation
);
export default router;

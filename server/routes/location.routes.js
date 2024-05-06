import express from "express";

import { verifyTokenWidthAdmin } from "../middlewares/auth.middleware.js";
import LocationController from "../controllers/location.controller.js";

const router = express.Router();

router.post(
  "/location",
  verifyTokenWidthAdmin,
  LocationController.createLocation
);
router.get("/locations", LocationController.getAllLocation);
router.get("/location/:id", LocationController.getLocationById);
router.put(
  "/location/:id",
  verifyTokenWidthAdmin,
  LocationController.udpateLocation
);
router.delete(
  "/location/:id",
  verifyTokenWidthAdmin,
  LocationController.deleteLocation
);
export default router;

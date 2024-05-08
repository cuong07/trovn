import express from "express";

import { verifyTokenAllRole } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";
import ListingController from "../controllers/listing.controller.js";

const router = express.Router();

router.post(
  "/listing",
  upload.array("files"),
  verifyTokenAllRole,
  ListingController.createListing
);

router.get("/listing/:id", ListingController.getListingById);
router.get("/listings", ListingController.getListings);
router.get("/listing/user/:id", ListingController.getListingByUserId);

export default router;

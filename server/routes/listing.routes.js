import express from "express";

import { verifyToken } from "../middlewares/auth.js";
import { upload } from "../config/multer.js";
import ListingController from "../controllers/listing.controller.js";

const router = express.Router();

router.post(
  "/listing",
  upload.array("files"),
  verifyToken,
  ListingController.createListing
);

export default router;

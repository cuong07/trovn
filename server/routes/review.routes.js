import express from "express";
import ReviewController from "../controllers/review.controller.js";
import { verifyTokenAllRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/reviews", ReviewController.findAll);
router.post("/reviews", verifyTokenAllRole, ReviewController.create);
router.delete("/reviews/:id", ReviewController.delete);
router.put("/reviews/:id", ReviewController.update);

export default router;

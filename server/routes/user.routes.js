import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/user/:id", UserController.getUser);
router.get("/user", verifyToken, UserController.getCurrentUser);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export default router;

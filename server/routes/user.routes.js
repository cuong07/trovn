import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyTokenAllRole } from "../middlewares/auth.middleware.js";
import { accessLogger } from "../middlewares/logger.middleware.js";
const router = express.Router();

router.get("/user/:id", UserController.getUser);
router.get("/user", verifyTokenAllRole, UserController.getCurrentUser);
router.post("/user", UserController.createUser);
router.post("/user/login", accessLogger, UserController.login);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export default router;

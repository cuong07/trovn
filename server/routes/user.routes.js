import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyTokenAllRole } from "../middlewares/auth.middleware.js";
import { accessLogger } from "../middlewares/logger.middleware.js";
import { upload } from "../config/multer.js";
const router = express.Router();

router.get("/user/otp", verifyTokenAllRole, UserController.getUserOtp);
router.post("/user/verify", UserController.verifyEmail);
router.get("/user/:id", UserController.getUser);
router.get("/user", verifyTokenAllRole, UserController.getCurrentUser);
router.get("/user/email/:email", UserController.getUserByEmail);
router.get("/users", verifyTokenAllRole, UserController.getAllUsers);

router.post("/user", UserController.createUser);
router.post("/user/login", accessLogger, UserController.login);
router.post("/user/email/:email", UserController.sendEmail);
router.put("/user/:id/forgot", UserController.changePassword);
router.put("/user/:id", UserController.updateUser);
router.put(
    "/user/avatar/:id",
    upload.single("file"),
    UserController.updateUserAvatar
);
router.delete("/user/:id", UserController.deleteUser);

export default router;

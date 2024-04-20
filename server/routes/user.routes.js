import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export default router;

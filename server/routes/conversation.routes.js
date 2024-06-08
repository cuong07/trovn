import express from "express";

import { verifyTokenAllRole } from "../middlewares/auth.middleware.js";
import ConversationController from "../controllers/conversation.controller.js";

const router = express.Router();

router.get(
  "/conversation",
  verifyTokenAllRole,
  ConversationController.getConversation
);

export default router;

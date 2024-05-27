import { Server } from "socket.io";
import express from "express";
import http from "http";
import UserService from "../services/user.service.js";
import ConversationService from "../services/conversation.service.js";
import MessageService from "../services/message.service.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.1.5:5173", "*"],
    credentials: true,
  },
});

const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("New connection");
  console.log("Connect User", socket.id);

  const token = socket.handshake.auth.token;
  const user = await UserService.getUserDetailsFromToken(token);

  socket.join(user?.id.toString());
  onlineUser.add(user?.id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("messagePage", async (userId) => {
    const userDetails = await UserService.getUserById(userId);
    const payload = {
      id: userDetails?.id,
      username: userDetails?.username,
      email: userDetails?.email,
      avatarUrl: userDetails?.avatarUrl,
      online: onlineUser.has(userId),
    };
    socket.emit("messageUser", payload);

    const getConversationMessage =
      await ConversationService.getConversationMessage(user.id, userId);
    socket.emit("message", {
      conversationId: userId,
      messages: getConversationMessage?.messages || [],
    });
  });

  socket.on("newMessage", async (data) => {
    console.log("data", data);
    let conversation = await ConversationService.getConversationMessage(
      data?.sender,
      data?.receiver
    );

    if (!conversation) {
      conversation = await ConversationService.createConversation(
        data?.sender,
        data?.receiver
      );
    }

    const message = await MessageService.createMessage(
      data?.text,
      data?.userId,
      conversation?.id
    );

    const getConversationMessage =
      await ConversationService.getConversationMessage(
        data?.sender,
        data?.receiver
      );

    io.to(data?.sender).emit("message", {
      conversationId: data?.receiver,
      messages: getConversationMessage?.messages || [],
    });
    io.to(data?.receiver).emit("message", {
      conversationId: data?.sender,
      messages: getConversationMessage?.messages || [],
    });

    const conversationSender = await ConversationService.getConversation(
      data?.sender
    );
    const conversationReceiver = await ConversationService.getConversation(
      data?.receiver
    );

    io.to(data?.sender).emit("conversation", conversationSender);
    io.to(data?.receiver).emit("conversation", conversationReceiver);
  });

  socket.on("sidebar", async (currentUserId) => {
    const conversation = await ConversationService.getConversation(
      currentUserId
    );
    socket.emit("conversation", conversation);
  });

  socket.on("seen", async (userId) => {
    try {
      if (!user || !userId) {
        console.error("User or userId is missing");
        return;
      }

      const conversation = await ConversationService.getConversationMessage(
        user.id,
        userId
      );
      const conversationMessageId =
        conversation?.messages?.map((item) => item.id) || [];

      if (conversationMessageId.length > 0) {
        await MessageService.updateMessage(conversationMessageId, userId, {
          isSeen: true,
        });

        const conversationSender = await ConversationService.getConversation(
          user.id
        );
        const conversationReceiver = await ConversationService.getConversation(
          userId
        );

        io.to(user.id).emit("conversation", conversationSender);
        io.to(userId).emit("conversation", conversationReceiver);
      }
    } catch (error) {
      console.error("Error in seen event:", error);
    }
  });

  socket.on("typing", (conversationId) => {
    socket.to(conversationId).emit("typing");
  });

  socket.on("stopTyping", (conversationId) => {
    socket.to(conversationId).emit("stopTyping");
  });

  socket.on("disconnect", () => {
    onlineUser.delete(user?.id);
    console.log("disconnect user ", socket.id);
  });
});

export { app, server };

import { Server } from "socket.io";
import express from "express";
import http from "http";
import UserService from "../services/user.service.js";
import ConversationService from "../services/conversation.service.js";
import MessageService from "../services/message.service.js";
import { logger } from "../config/winston.js";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true,
    },
});
const onlineUser = new Set();

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        const actualToken = token.startsWith("Bearer ")
            ? token.slice(7)
            : token;
        logger.info("SOCKET TOKEN: ", actualToken);
        try {
            const decoded = jwt.verify(actualToken, process.env.SECRET_KEY);
            socket.user = decoded;
            next();
        } catch (error) {
            next(new Error("Invalid token"));
        }
    } else {
        next(new Error("Authentication error"));
    }
});

io.on("connection", async (socket) => {
    logger.info("Connect User", socket.id);

    const user = socket.user;
    if (!user) {
        logger.error(new Error("User not found"));
        return;
    }

    socket.join(user.id.toString());
    onlineUser.add(user.id.toString());

    if (!user) {
        logger.error(new Error("User not found"));
        return;
    }

    io.emit("onlineUser", Array.from(onlineUser));

    socket.on("messagePage", async (userId) => {
        try {
            const userDetails = await UserService.getUserById(userId);
            if (!userDetails) {
                throw new Error("User not found");
            }
            const payload = {
                id: userDetails?.id,
                username: userDetails?.username,
                email: userDetails?.email,
                avatarUrl: userDetails?.avatarUrl,
                online: onlineUser.has(userId),
            };
            socket.emit("messageUser", payload);

            const getConversationMessage =
                await ConversationService.getConversationMessage(
                    user.id,
                    userId
                );
            socket.emit("message", {
                conversationId: userId,
                messages: getConversationMessage?.messages || [],
            });
        } catch (error) {
            logger.error("Error in messagePage event:", error);
            socket.emit("error", "An error occurred while fetching messages");
        }
    });

    socket.on("newMessage", async (data) => {
        try {
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
            logger.info(message.content);

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

            io.to(data?.receiver).emit("newMessageNotification", {
                sender: data?.sender,
                text: data?.text,
                senderName: data?.senderName,
            });

            const conversationSender =
                await ConversationService.getConversation(data?.sender);
            const conversationReceiver =
                await ConversationService.getConversation(data?.receiver);

            io.to(data?.sender).emit("conversation", conversationSender);
            io.to(data?.receiver).emit("conversation", conversationReceiver);
        } catch (error) {
            logger.error("Error in newMessage event:", error);
            socket.emit("error", "An error occurred while sending the message");
        }
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
                logger.error("User or userId is missing");
                return;
            }

            const conversation =
                await ConversationService.getConversationMessage(
                    user.id,
                    userId
                );
            const conversationMessageId =
                conversation?.messages?.map((item) => item.id) || [];

            if (conversationMessageId.length > 0) {
                await MessageService.updateMessage(
                    conversationMessageId,
                    userId,
                    {
                        isSeen: true,
                    }
                );

                const conversationSender =
                    await ConversationService.getConversation(user.id);
                const conversationReceiver =
                    await ConversationService.getConversation(userId);

                io.to(user.id).emit("conversation", conversationSender);
                io.to(userId).emit("conversation", conversationReceiver);
            }
        } catch (error) {
            logger.error("Error in seen event:", error);
        }
    });

    socket.on("unreadMessagesCount", async (userId) => {
        try {
            logger.info("checkUnreadMessages event received");
            if (!userId) {
                logger.error("userId is missing");
                return;
            }
            const unreadCount = await MessageService.getMessageNotSeen(userId);
            logger.info(`Unread messages for user ${userId}: ${unreadCount}`);
            socket.emit("unreadMessagesCount", unreadCount);
        } catch (error) {
            logger.error("Error in checkUnreadMessages event:", error);
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
        logger.info("disconnect user ", socket.id);
        io.emit("onlineUser", Array.from(onlineUser));
    });
});

export { app, server };

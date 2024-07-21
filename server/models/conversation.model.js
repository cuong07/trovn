import db from "../lib/db.js";
import dayjs from "dayjs";

const UserModel = {
    methods: {
        async getConversations(currentUserId) {
            const currentUserConversation = await db.conversation.findMany({
                where: {
                    OR: [
                        { userOneId: currentUserId },
                        { userTwoId: currentUserId },
                    ],
                },
                orderBy: {
                    updatedAt: "desc",
                },
                include: {
                    messages: true,
                    userOne: true,
                    userTwo: true,
                },
            });
            const conversation = currentUserConversation.map((conv) => {
                return {
                    id: conv?.id,
                    sender: conv?.userTwo,
                    updatedAt: conv?.updatedAt,
                    receiver: conv?.userOne,
                    lastMsg: conv.messages[conv?.messages?.length - 1],
                };
            });
            return conversation;
        },

        async getConversationMessage(senderId, receiverId) {
            return await db.conversation.findFirst({
                where: {
                    OR: [
                        { userOneId: senderId, userTwoId: receiverId },
                        { userOneId: receiverId, userTwoId: senderId },
                    ],
                },
                include: {
                    messages: {
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
            });
        },

        async createConversation(sender, receiver) {
            return await db.conversation.create({
                data: {
                    userOneId: sender,
                    userTwoId: receiver,
                },
            });
        },

        async updatedAtConversation(id) {
            return await db.conversation.update({
                where: {
                    id,
                },
                data: {
                    updatedAt: new Date(),
                },
            });
        },
    },
};

export default UserModel;

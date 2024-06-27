import db from "../lib/db.js";

const MessageModel = {
    methods: {
        async createMessage(content, userId, conversationId) {
            return await db.message.create({
                data: {
                    content: content,
                    userId: userId,
                    conversationId: conversationId,
                },
            });
        },

        async updateMessage(messageIds, userId, data) {
            return await db.message.updateMany({
                where: {
                    id: { in: messageIds },
                    userId,
                },
                data: {
                    isSeen: true,
                },
            });
        },

        async findAllMessageNotSeenByUser(userId) {
            return await db.message.count({
                where: {
                    conversation: {
                        OR: [{ userOneId: userId }, { userTwoId: userId }],
                    },
                    isSeen: false,
                    userId: {
                        not: userId,
                    },
                },
            });
        },
    },
};

export default MessageModel;

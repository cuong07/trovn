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
  },
};

export default MessageModel;

import MessageModel from "../models/message.model.js";

const MessageService = {
  async createMessage(content, userId, conversationId) {
    try {
      return MessageModel.methods.createMessage(
        content,
        userId,
        conversationId
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async updateMessage(id, userId, data) {
    try {
      return MessageModel.methods.updateMessage(id, userId, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default MessageService;

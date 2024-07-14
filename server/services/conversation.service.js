import { logger } from "../config/winston.js";
import ConversationModel from "../models/conversation.model.js";

const ConversationService = {
    async getConversation(currentUserId) {
        try {
            return ConversationModel.methods.getConversations(currentUserId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
    async getConversationMessage(userOneId, userTwoId) {
        try {
            return ConversationModel.methods.getConversationMessage(
                userOneId,
                userTwoId
            );
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
    async createConversation(sender, receiver) {
        try {
            return ConversationModel.methods.createConversation(
                sender,
                receiver
            );
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
    async updateAtConversation(id) {
        try {
            return ConversationModel.methods.updatedAtConversation(id);
        } catch (error) {}
    },
};

export default ConversationService;

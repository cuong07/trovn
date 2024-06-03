import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import ConversationService from "../services/conversation.service.js";

const ConversationController = {
  async getConversation(req, res) {
    const { id } = req.query;
    try {
      const conversation = await ConversationService.getConversation(id);
      if (conversation) {
        return res
          .status(statusCode.OK)
          .json(BaseResponse.success("Thành công", conversation));
      }
      return res
        .status(statusCode.NOT_FOUND)
        .json(BaseResponse.error("Chưa có cuộc trò chuyện nào", []));
    } catch (error) {
      console.log(v);
      return res
        .status(statusCode.NOT_FOUND)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default ConversationController;

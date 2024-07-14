import { statusCode } from "../config/statusCode.js";
import { logger } from "../config/winston.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import OrderService from "../services/order.service.js";

const OrderController = {
    async getOrdersByUserId(req, res) {
        const { user } = req;
        try {
            const { id } = user;
            const orders = await OrderService.getOrdersByUserId(id);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", orders));
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },
};

export default OrderController;

import { logger } from "../config/winston.js";
import PaymentModel from "../models/payment.model.js";
import OrderService from "./order.service.js";
import UserService from "./user.service.js";

const PaymentService = {
    async createPayment(data) {
        try {
            return await PaymentModel.methods.createPayment(data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async findByUser(id) {
        try {
            return await PaymentModel.methods.findByUser(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getPaymentById(id) {
        try {
            return await PaymentModel.methods.getPaymentById(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getPaymentActiveByUser(id) {
        try {
            return await PaymentModel.methods.getPaymentActiveByUser(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getPaymentsByUser(id) {
        try {
            return await PaymentModel.methods.getPaymentsByUser(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getPaymentStatus(status) {
        try {
            return await PaymentModel.methods.getPaymentStatus(status);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getUserForTransactionId(id) {
        try {
            return await PaymentModel.methods.getUserForTransactionId(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deletePayment(id) {
        try {
            return await PaymentModel.methods.deletePayment(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async updatePaymentActive(status, user, data) {
        try {
            const { amount, orderId, extraData } = data;
            const userUpdate = {
                isPremium: true,
            };

            const payment = await PaymentModel.methods.updatePaymentActive(
                orderId,
                status,
                true
            );

            await UserService.updateUser(user.id, userUpdate);

            const orderData = {
                userId: user.id,
                advertisingPackageId: extraData,
                amount: amount,
                paymentId: payment.id,
            };

            const order = await OrderService.createOrder(orderData);

            return order;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async updatePayment(id, data) {
        try {
            return await PaymentModel.methods.updatePayment(id, data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getPaymentByTransactionId(id) {
        try {
            return await PaymentModel.methods.getPaymentByTransactionId(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};

export default PaymentService;

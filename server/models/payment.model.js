import db from "../lib/db.js";

const PaymentModel = {
  methods: {
    async createPayment(data) {
      return await db.payment.create({
        data: data,
      });
    },

    async getPaymentById(id) {
      return await db.payment.findUnique({
        where: {
          id: id,
        },
      });
    },

    async getPaymentsByUser(userId) {
      return await db.payment.findMany({
        where: {
          userId: userId,
        },
      });
    },

    async getPaymentActiveByUser(userId) {
      return await db.payment.findFirst({
        where: {
          userId: userId,
          status: true,
          isActive: true,
        },
      });
    },

    async getPaymentStatus(status) {
      return await db.payment.findMany({
        where: {
          status: status,
        },
      });
    },

    async getUserForTransactionId(transactionId) {
      const user = await db.payment.findUnique({
        where: {
          transactionId: transactionId,
        },
        select: {
          user: true,
        },
      });
      return user;
    },

    async updatePaymentActive(orderId, status, isActive) {
      return await db.payment.update({
        where: {
          transactionId: orderId,
        },
        data: {
          status: status,
          isActive: status,
        },
      });
    },

    async updatePayment(id, data) {
      return await db.payment.update({
        where: {
          id,
        },
        data: data,
      });
    },

    async deletePayment(paymentId) {
      return await db.payment.delete({
        where: {
          id: paymentId,
        },
      });
    },

    async findManyPaymentByDate(startOfDay, endOfDay) {
      return await db.payment.findMany({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
          status: true,
        },
        select: {
          amount: true,
        },
      });
    },
  },
};

export default PaymentModel;

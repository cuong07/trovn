import PaymentModel from "../models/payment.model.js";

const PaymentService = {
  async createPayment(data) {
    try {
      return await PaymentModel.methods.createPayment(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getPaymentActiveByUser(id) {
    try {
      return await PaymentModel.methods.getPaymentActiveByUser(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getPaymentsByUser(id) {
    try {
      return await PaymentModel.methods.getPaymentsByUser(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getPaymentStatus() {
    try {
      return await PaymentModel.methods.getPaymentStatus(true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getUserForTransactionId(id) {
    try {
      return await PaymentModel.methods.getUserForTransactionId(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deletePayment(id) {
    try {
      return await PaymentModel.methods.deletePayment(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updatePaymentActive(orderId, isActive, status) {
    try {
      return await PaymentModel.methods.updatePaymentActive(
        orderId,
        isActive,
        status
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default PaymentService;

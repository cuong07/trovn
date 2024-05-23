import OrderModel from "../models/order.model.js";

const OrderService = {
  async createOrder(data) {
    try {
      const order = await OrderModel.methods.createOrder(data);
      return order;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getOrdersByUserId(id) {
    try {
      const orders = await OrderModel.methods.getOrdersByUserId(id);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getOderByAdsId(id) {
    try {
      const orders = await OrderModel.methods.getOrderByAdsPackageId(id);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default OrderService;

import LoactionModel from "../models/loaction.model.js";

const LoactionService = {
  async createLoaction(locationData) {
    try {
      return await LoactionModel.methods.insertLocation(locationData);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
  async getAllLocation() {
    try {
      return await LoactionModel.methods.getLocations();
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
  async getLocationById(locationId) {
    try {
      return await LoactionModel.methods.getLocationById(locationId);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};
export default LoactionService;

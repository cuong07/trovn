import LoactionModel from "../models/loaction.model.js";

const LoactionService = {
  async createLoaction(locationData) {
    try {
      return await LoactionModel.methods.insertLocation(locationData);
    } catch (error) {
      throw error;
    }
  },
  async getAllLocation() {
    try {
      return await LoactionModel.methods.getLocations();
    } catch (error) {
      throw error;
    }
  },
  async getLocationById(locationId) {
    try {
      return await LoactionModel.methods.getLocationById(locationId);
    } catch (error) {
      throw error;
    }
  },

  async updateLocation(locationId, locationData) {
    try {
      return await LoactionModel.methods.updateLocation(
        locationId,
        locationData
      );
    } catch (error) {
      throw error;
    }
  },

  async deleteLocation(locationId) {
    try {
      return await LoactionModel.methods.deleteLocation(locationId);
    } catch (error) {
      throw error;
    }
  },
};
export default LoactionService;

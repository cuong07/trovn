import LocationModel from "../models/location.model.js";

const LocationService = {
  async createLocation(locationData) {
    try {
      return await LocationModel.methods.insertLocation(locationData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getAllLocation(page, limit, keyword) {
    try {
      return await LocationModel.methods.getLocations(page, limit, keyword);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getLocationById(locationId) {
    try {
      return await LocationModel.methods.getLocationById(locationId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateLocation(locationId, locationData) {
    try {
      return await LocationModel.methods.updateLocation(
        locationId,
        locationData
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deleteLocation(locationId) {
    try {
      return await LocationModel.methods.deleteLocation(locationId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default LocationService;

import AdvertisingPackageModel from "../models/advertising.package.model.js";

const AdvertisingPackageService = {
  async createAdPackage(data) {
    try {
      return await AdvertisingPackageModel.methods.createAdPackage(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deleteAdPackage(id) {
    try {
      return await AdvertisingPackageModel.methods.deleteAdPackage(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getAdPackages() {
    try {
      return await AdvertisingPackageModel.methods.getAdPackages();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default AdvertisingPackageService;

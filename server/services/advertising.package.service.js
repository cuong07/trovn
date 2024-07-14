import { logger } from "../config/winston.js";
import AdvertisingPackageModel from "../models/advertising.package.model.js";

const AdvertisingPackageService = {
    async createAdPackage(data) {
        try {
            return await AdvertisingPackageModel.methods.createAdPackage(data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deleteAdPackage(id) {
        try {
            return await AdvertisingPackageModel.methods.deleteAdPackage(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getAdPackages() {
        try {
            return await AdvertisingPackageModel.methods.getAdPackages();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};

export default AdvertisingPackageService;

import AdvertisingPackageService from "../services/advertising.package.service.js";
import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";

const AdvertisingPackageController = {
  async createAdPackage(req, res) {
    const data = req.body;
    try {
      const adPackage = await AdvertisingPackageService.createAdPackage(data);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", adPackage));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async deleteAdPackage(req, res) {
    const { id } = req.params;
    try {
      await AdvertisingPackageService.deleteAdPackage(id);
      return res
        .status(statusCode.NO_CONTENT)
        .json(BaseResponse.success("Thành công", null));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getAdsPack(req, res) {
    try {
      const adPacks = await AdvertisingPackageService.getAdPackages();
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", adPacks));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default AdvertisingPackageController;

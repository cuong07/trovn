import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import LocaionService from "../services/location.service.js";

const LocaionController = {
  async getAllLocation(req, res) {
    try {
      const locations = await LocaionService.getAllLocation();
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", locations));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },
  async createLocation(req, res) {
    const locationData = req.body;
    try {
      const location = await LocaionService.createLoaction(locationData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", location));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default LocaionController;

import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import LocaionService from "../services/location.service.js";

const LocaionController = {
  async getAllLocation(req, res) {
    try {
      const amenities = await LocaionService.getAllLocation();
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", amenities));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },
  async createAmenitie(req, res) {
    const file = req.file;
    const amenitieData = req.body;
    try {
      const newData = {
        ...amenitieData,
        file,
      };
      const amenitie = await LocaionService.createAmenitie(newData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", amenitie));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default LocaionController;

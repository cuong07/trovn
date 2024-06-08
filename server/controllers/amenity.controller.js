import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import AmenityService from "../services/amenity.service.js";

const AmenityController = {
  async getAllAmenity(req, res) {
    try {
      const amenities = await AmenityService.getAllAmenity();
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", amenities));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },
  async createAmenity(req, res) {
    const file = req.file;
    const amenityData = req.body;
    try {
      const newData = {
        ...amenityData,
        file,
      };
      const amenity = await AmenityService.createAmenity(newData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", amenity));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
  async updateAmenity(req, res) {
    const { id } = req.params;
    const file = req.file;
    const amenityData = req.body;
    try {
      const newData = {
        ...amenityData,
        file,
      };
      const amenity = await AmenityService.udpateAmenity(id, newData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", amenity));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async deleteAmenity(req, res) {
    const { id } = req.params;
    try {
      await AmenityService.deleteAmenity(id);
      return res
        .status(statusCode.NO_CONTENT)
        .json(BaseResponse.success("Thành công", null));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default AmenityController;

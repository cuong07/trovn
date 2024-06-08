import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import LocationService from "../services/location.service.js";

const LocationController = {
  async getAllLocation(req, res) {
    const { page, limit, keyword } = req.query;
    try {
      const locations = await LocationService.getAllLocation(
        page,
        limit,
        keyword
      );
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
      const location = await LocationService.createLocation(locationData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", location));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getLocationById(req, res) {
    const { id } = req.params;
    try {
      const location = await LocationService.getLocationById(id);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", location));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async udpateLocation(req, res) {
    const { id } = req.params;
    const locationData = req.body;
    try {
      const location = await LocationService.updateLocation(id, locationData);
      return res
        .status(statusCode.ACCEPTED)
        .json(BaseResponse.success("Thành công", location));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async deleteLocation(req, res) {
    const { id } = req.params;
    try {
      await LocationService.deleteLocation(id);
      return res
        .status(statusCode.NO_CONTENT)
        .json(BaseResponse.success("Thành công"));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default LocationController;

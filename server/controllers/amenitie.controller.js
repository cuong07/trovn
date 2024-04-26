import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import AmenitieService from "../services/amenitie.service.js";

const AmenitieController = {
  async getAllAmenitie(req, res) {
    try {
      const amenities = await AmenitieService.getAllAmenitie();
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
      const amenitie = await AmenitieService.createAmenitie(newData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", amenitie));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
  async updateAmenitie(req, res) {
    const { id } = req.params;
    const file = req.file;
    const amenitieData = req.body;
    try {
      const newData = {
        ...amenitieData,
        file,
      };
      const amenitie = await AmenitieService.udpateAmenitie(id, newData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", amenitie));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async deleteAmenitie(req, res) {
    const { id } = req.params;
    try {
      await AmenitieService.deleteAmenitie(id);
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

export default AmenitieController;

import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import ImageService from "../services/image.service.js";

const ImageController = {
  // async createImage(req, res) {
  //   const { file } = req;
  //   try {
  //     const image = await ImageService.createImage(file);
  //     return res
  //       .status(statusCode.CREATED)
  //       .json(BaseResponse.success("Thành công", image));
  //   } catch (error) {
  //     return res
  //       .status(statusCode.INTERNAL_SERVER_ERROR)
  //       .json(BaseResponse.error(error.message, error));
  //   }
  // },

  async deleteImage() {
    const { id } = req.params;
    try {
      await ImageService.deleteImage(id);
      return res
        .status(statusCode.NO_CONTENT)
        .json(BaseResponse.success("Thành công"));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async deleteImageByListingId(listingId) {
    try {
      await ImageService.deleteImageByListingId(listingId);
      return res
        .status(statusCode.NO_CONTENT)
        .json(BaseResponse.success("Thành công"));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default ImageController;

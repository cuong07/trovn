import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import BannerService from "../services/banner.service.js";

const BannerController = {
  async getBanners(req, res) {
    try {
      const banners = await BannerService.getBanners();
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", banners));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getBannersActive(req, res) {
    try {
      const banners = await BannerService.getBannersActive();
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", banners));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getBannersByUser(req, res) {
    const { user } = req;
    try {
      const banners = await BannerService.getBannersByUserId(user.id);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", banners));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async createBanners(req, res) {
    const { user, file } = req;
    const bannerData = req.body;
    try {
      const { id } = user;
      const newBanner = {
        userId: id,
        ...bannerData,
        file,
      };
      const banners = await BannerService.createBanner(newBanner);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", banners));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default BannerController;

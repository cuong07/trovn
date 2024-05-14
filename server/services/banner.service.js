import fs from "fs";

import Logger from "../utils/logger.utils.js";
import BannerModel from "../models/banner.model.js";
import UserModal from "../models/user.model.js";
import { uploader } from "../utils/uploader.js";

const BannerService = {
  async getBanners() {
    try {
      const banners = await BannerModel.methods.getBanners();
      return banners;
    } catch (error) {
      Logger.error("BANNER_SERVICE: getBanners", error);
      throw error;
    }
  },

  async createBanner(bannerData) {
    try {
      const { file, ...newBannerData } = bannerData;
      const { path } = file;
      const newPath = await uploader(path);
      fs.unlinkSync(path);
      const newBanner = {
        imageUrl: newPath.url,
        ...newBannerData,
      };
      console.log(newBanner);
      return await BannerModel.methods.createBanner(newBanner);
    } catch (error) {
      Logger.error("BANNER_SERVICE: createBanner", error);
      throw error;
    }
  },

  async getBannersByUserId(userId) {
    try {
      const existingUser = await UserModal.methods.getUserById(userId);
      if (!existingUser) {
        throw new Error("Không tìm thấy người dùng");
      }
      if (!existingUser.isPremium) {
        throw new Error("Vui lòng đăng kí gói premium để sử dụng dịch vụ");
      }
      return await BannerModel.methods.getBannersByUserId(userId);
    } catch (error) {
      Logger.error("BANNER_SERVICE: getBannersByUserId", error);
      throw error;
    }
  },

  async getBannersActive() {
    try {
      return await BannerModel.methods.getBannersActive();
    } catch (error) {
      Logger.error("BANNER_SERVICE: getBannersActive", error);
      throw error;
    }
  },

  async updateBanner(bannerId, bannerData) {
    try {
      return await BannerModel.methods.updateBanner(bannerId, bannerData);
    } catch (error) {
      Logger.error("BANNER_SERVICE: updateBanner", error);
      throw error;
    }
  },

  async deleteBanner(bannerId) {
    try {
      return await BannerModel.methods.deleteBanner(bannerId);
    } catch (error) {
      Logger.error("BANNER_SERVICE: deleteBanner", error);
      throw error;
    }
  },
};

export default BannerService;
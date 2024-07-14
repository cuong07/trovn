import fs from "fs";

import BannerModel from "../models/banner.model.js";
import UserModal from "../models/user.model.js";
import { uploader } from "../utils/uploader.js";
import PaymentService from "./payment.service.js";
import { logger } from "../config/winston.js";

const BannerService = {
    async getBanners() {
        try {
            const banners = await BannerModel.methods.getBanners();
            return banners;
        } catch (error) {
            logger.error("BANNER_SERVICE: getBanners", error);
            throw error;
        }
    },

    async createBanner(bannerData) {
        try {
            const { file, paymentId, ...newBannerData } = bannerData;
            const payment = await PaymentService.getPaymentById(paymentId);
            logger.info(payment);
            if (payment.isActive) {
                const { path } = file;
                const newPath = await uploader(path);
                fs.unlinkSync(path);
                const newBanner = {
                    imageUrl: newPath.url,
                    ...newBannerData,
                };
                const banner = await BannerModel.methods.createBanner(
                    newBanner
                );
                if (banner) {
                    await PaymentService.updatePayment(paymentId, {
                        isActive: false,
                    });
                    return banner;
                }
                throw new Error("Có lỗi khi tạo banner");
            }
            throw new Error("Bạn đã sử dụng dịch vụ");
        } catch (error) {
            logger.error("BANNER_SERVICE: createBanner", error);
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
                throw new Error(
                    "Vui lòng đăng kí gói premium để sử dụng dịch vụ"
                );
            }
            return await BannerModel.methods.getBannersByUserId(userId);
        } catch (error) {
            logger.error("BANNER_SERVICE: getBannersByUserId", error);
            throw error;
        }
    },

    async getBannersActive() {
        try {
            return await BannerModel.methods.getBannersActive();
        } catch (error) {
            logger.error("BANNER_SERVICE: getBannersActive", error);
            throw error;
        }
    },

    async updateBanner(bannerId, bannerData) {
        try {
            return await BannerModel.methods.updateBanner(bannerId, bannerData);
        } catch (error) {
            logger.error("BANNER_SERVICE: updateBanner", error);
            throw error;
        }
    },

    async deleteBanner(bannerId) {
        try {
            return await BannerModel.methods.deleteBanner(bannerId);
        } catch (error) {
            logger.error("BANNER_SERVICE: deleteBanner", error);
            throw error;
        }
    },
    async updateBannerStatus(bannerId, isActive) {
        try {
            const banner = await BannerModel.methods.getBannerById(bannerId);
            if (!banner) {
                throw new Error(`Banner with ID ${bannerId} not found`);
            }
            banner.isActive = isActive;

            const updatedBanner = await BannerModel.methods.updateBanner(
                bannerId,
                banner
            );

            return updatedBanner;
        } catch (error) {
            logger.error(`Error updating banner status: ${error.message}`);
            throw error;
        }
    },
};

export default BannerService;

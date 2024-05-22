import db from "../lib/db.js";
import dayjs from "dayjs";
import "dayjs/locale/vi.js";
const BannerModel = {
  methods: {
    async createBanner(bannerData) {
      return db.banner.create({
        data: bannerData,
      });
    },

    async getBanners() {
      return db.banner.findMany({
        where: {
          isActive: true,
          isAvailable: true,
        },
      });
    },

    async getBannersByUserId(userId) {
      return db.banner.findMany({
        where: {
          userId,
        },
      });
    },

    async getBannersActive() {
      const now = dayjs().toISOString();

      const validBanners = await db.banner.findMany({
        where: {
          fromDate: {
            lte: now,
          },
          toDate: {
            gte: now,
          },
          isAvailable: true,
        },
      });

      return validBanners;
    },

    async updateExpiredBanners() {
      const now = dayjs().toISOString();
      console.log(now);
      const updatedBanners = await db.banner.updateMany({
        where: {
          toDate: {
            lt: now,
          },
          isAvailable: true,
        },
        data: {
          isAvailable: false,
        },
      });

      console.log(updatedBanners);

      return updatedBanners;
    },

    async updateBanner(bannerId, bannerData) {
      return await db.banner.update({
        where: {
          id: bannerId,
        },
        data: bannerData,
      });
    },

    async deleteBanner(bannerId) {
      return await db.banner.delete({
        where: {
          id: bannerId,
        },
      });
    },
  },
};

export default BannerModel;

import db from "../lib/db.js";

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
      return db.banner.findMany({
        where: {
          toDate: {
            gt: new Date(),
          },
          isActive: true,
          isAvailable: true,
        },
      });
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

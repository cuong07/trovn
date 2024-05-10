import db from "../lib/db.js";

const AdvertisingPackageModel = {
  methods: {
    async createAdPackage(adPackageData) {
      return await db.advertisingPackage.create({
        data: adPackageData,
      });
    },

    async getAdPackages() {
      return await db.advertisingPackage.findMany({
        orderBy: {
          duration: "asc",
        },
      });
    },

    async deleteAdPackage(adPackageId) {
      return await db.advertisingPackage.delete({
        where: {
          id: adPackageId,
        },
      });
    },
  },
};

export default AdvertisingPackageModel;

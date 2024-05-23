import db from "../lib/db.js";

const LocationModel = {
  methods: {
    async getLocations(page, limit) {
      const currentPage = +page || 1;
      const take = limit ? +limit : undefined;
      const skip = take ? Math.max(0, (currentPage - 1) * take) : 0;

      const [totalElement, contents] = await db.$transaction([
        db.location.count(),
        db.location.findMany({
          take,
          skip,
        }),
      ]);

      const totalPage = take ? Math.ceil(totalElement / take) : 1;

      return { totalElement, currentPage, totalPage, contents };
    },

    async getLocationById(locationId) {
      return await db.image.findUnique({
        where: {
          id: locationId,
        },
      });
    },

    async updateLocation(locationId, locationData) {
      return await db.location.update({
        where: {
          id: locationId,
        },
        data: locationData,
      });
    },

    async insertLocation(locationData) {
      return await db.location.create({
        data: locationData,
      });
    },

    async deleteLocation(locationId) {
      return await db.image.delete({
        where: {
          id: locationId,
        },
      });
    },
  },
};

export default LocationModel;

import db from "../lib/db.js";

const LocationModel = {
  methods: {
    async insertLocation(locationData) {
      return await db.location.create({
        data: locationData,
      });
    },

    async getLocations() {
      return await db.location.findMany();
    },

    async getLocationById(locationId) {
      return await db.image.findUnique({
        where: {
          id: locationId,
        },
      });
    },

    async deleteLocationById(locationId) {
      return await db.image.delete({
        where: {
          id: locationId,
        },
      });
    },
  },
};

export default LocationModel;

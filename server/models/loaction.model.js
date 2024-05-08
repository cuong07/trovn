import db from "../lib/db.js";

const LocationModel = {
  methods: {
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

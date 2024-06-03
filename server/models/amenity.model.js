import db from "../lib/db.js";

const AmenityModel = {
  fields: {
    id: {
      type: "String",
      primaryKey: true,
      unique: true,
    },
    name: {
      type: "String",
    },
    description: {
      type: "String",
      unique: true,
    },
    iconUrl: {
      type: "String",
    },
  },

  methods: {
    async findAllAmenity() {
      return await db.amenity.findMany();
    },

    async createAmenity(AmenityData) {
      return await db.amenity.create({
        data: AmenityData,
      });
    },

    async updateAmenity(AmenityId, AmenityData) {
      return await db.amenity.update({
        where: { id: AmenityId },
        data: AmenityData,
      });
    },
    async deleteAmenity(AmenityId) {
      return await db.amenity.delete({
        where: { id: AmenityId },
      });
    },
  },
};

export default AmenityModel;

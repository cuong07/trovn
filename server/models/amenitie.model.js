import db from "../lib/db.js";

const AmenitieModel = {
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
    async findAlllAmenitie() {
      return await db.amenitie.findMany();
    },

    async createAmenitie(AmenitieData) {
      return await db.amenitie.create({
        data: AmenitieData,
      });
    },

    async updateAmenitie(amenitieId, AmenitieData) {
      return await db.amenitie.update({
        where: { id: amenitieId },
        data: AmenitieData,
      });
    },
    async deleteAmenitie(amenitieId) {
      return await db.amenitie.delete({
        where: { id: amenitieId },
      });
    },
  },
};

export default AmenitieModel;

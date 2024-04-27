import db from "../lib/db.js";

const ListingModel = {
  fields: {
    id: {
      type: "String",
      primaryKey: true,
      unique: true,
    },
    title: {
      type: "String",
    },
    description: {
      type: "String",
      unique: true,
    },
    address: {
      type: "String",
    },
    latitude: {
      type: "Decimal",
    },
    longitude: {
      type: "Decimal",
    },
    price: {
      type: "Decimal",
    },
    area: {
      type: "Decimal",
    },
    term: {
      type: "String",
    },
  },

  methods: {
    async createListing(listingData) {
      return await db.listing.create({
        data: listingData,
      });
    },

    async getListingById(listingId) {
      return await prisma.listing.findUnique({
        where: {
          id: listingId,
        },
      });
    },

    async updateListing(listingId, listingUpdate) {
      return await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: listingUpdate,
      });
    },

    async deleteListing(listingId) {
      return await prisma.listing.delete({
        where: {
          id: listingId,
        },
      });
    },
  },
};

export default ListingModel;

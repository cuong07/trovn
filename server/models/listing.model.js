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
      return await db.listing.findUnique({
        where: {
          id: listingId,
        },
        include: {
          images: true,
          location: true,
          reviews: true,
          user: true,
          listingAmenities: {
            include: {
              amenity: true,
            },
          },
        },
      });
    },

    async getListingByUserId(userId) {
      return await db.listing.findMany({
        where: {
          userId: userId,
        },
        include: {
          images: true,
          location: true,
          reviews: true,
        },
      });
    },

    async updateListing(listingId, listingUpdate) {
      return await db.listing.update({
        where: {
          id: listingId,
        },
        data: listingUpdate,
      });
    },

    async deleteListing(listingId) {
      return await db.listing.delete({
        where: {
          id: listingId,
        },
      });
    },
    async getListings(page, limit, keyword, sort) {
      // * bỏ qua các phần tử đã lấy ở page trước
      const skip = Math.max(0, (page - 1) * limit);
      const currentPage = +page || 1;
      const take = +limit || 10;
      const [totalElement, contents] = await db.$transaction([
        db.listing.count(),
        db.listing.findMany({
          take,
          skip,
          orderBy: {
            createdAt: sort,
          },
          where: {
            OR: [
              { title: { contains: keyword } },
              { description: { contains: keyword } },
            ],
            NOT: [{ isPublish: true }],
          },
          include: {
            images: true,
            user: true,
            reviews: true,
          },
        }),
      ]);
      let totalPage = Math.ceil(totalElement / take);
      return { totalElement, currentPage, totalPage, contents };
    },
  },
};

export default ListingModel;

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
      const {
        title,
        description,
        address,
        latitude,
        longitude,
        price,
        area,
        locationId,
        term,
        amenityConnections,
        userId,
      } = listingData;

      const amenities = amenityConnections.split(",").map((amenityId) => ({
        amenity: { connect: { id: amenityId } },
      }));

      return await db.listing.create({
        data: {
          title,
          description,
          address,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          price,
          area,
          term,
          listingAmenities: { create: amenities },
          user: { connect: { id: userId } },
          location: { connect: { id: locationId } },
        },
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
    async getListings(page, limit, keyword, latCoords, lngCoords) {
      // Initialize variables for pagination
      const skip = Math.max(0, (page - 1) * limit);
      const currentPage = +page || 1;
      const take = +limit || 10;

      const filters = {
        NOT: [{ isPublish: true }],
      };

      if (keyword) {
        filters.OR = [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
          { address: { contains: keyword } },
        ];
      }

      if (latCoords) {
        const latMin = Math.min(...latCoords.split(","));
        const latMax = Math.max(...latCoords.split(","));
        filters.latitude = {
          gte: latMin,
          lte: latMax,
        };
      }

      if (lngCoords) {
        const lngMin = Math.min(...lngCoords.split(","));
        const lngMax = Math.max(...lngCoords.split(","));
        filters.longitude = {
          gte: lngMin,
          lte: lngMax,
        };
      }

      const [totalElement, contents] = await db.$transaction([
        db.listing.count({
          where: filters,
        }),
        db.listing.findMany({
          take,
          skip,
          orderBy: {
            createdAt: "asc",
          },
          where: filters,
          include: {
            images: true,
            user: true,
            reviews: true,
            listingAmenities: {
              include: {
                amenity: true,
              },
            },
          },
        }),
      ]);

      // Calculate the total number of pages
      const totalPage = Math.ceil(totalElement / take);

      // Return the results
      return { totalElement, currentPage, totalPage, contents };
    },
  },
};

export default ListingModel;

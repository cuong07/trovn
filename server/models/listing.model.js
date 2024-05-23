import db from "../lib/db.js";
import { removeAccents } from "../utils/removeAccents.js";

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
        tags,
      } = listingData;

      const amenities = amenityConnections.split(",").map((amenityId) => ({
        amenity: { connect: { id: amenityId } },
      }));

      const newListing = await db.listing.create({
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

      const listingId = newListing.id;

      const tagArray = tags.split(",").map(async (tagName) => {
        const tag = await db.tag.upsert({
          where: { name: tagName },
          create: { name: tagName },
          update: {},
        });

        await db.listingTag.create({
          data: {
            listings: { connect: { id: listingId } },
            tag: { connect: { id: tag.id } },
          },
        });
      });

      await Promise.all(tagArray);

      return newListing;
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

          listingTags: {
            include: {
              tag: true,
            },
          },
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
      const searchTerm = removeAccents(keyword ?? "");

      const filters = {
        NOT: [{ isPublish: true }],
      };

      if (keyword) {
        filters.OR = [
          { title: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
          { address: { contains: keyword, mode: "insensitive" } },
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
            listingTags: {
              include: {
                tag: true,
              },
            },
            listingAmenities: {
              include: {
                amenity: true,
              },
            },
          },
        }),
      ]);

      const totalPage = Math.ceil(totalElement / take);

      return { totalElement, currentPage, totalPage, contents };
    },
  },
};

export default ListingModel;

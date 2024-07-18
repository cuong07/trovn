import prisma from "../lib/db.js";
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

            const amenities = amenityConnections
                .split(",")
                .map((amenityId) => ({
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

        async getListingByIdAndUserId(listingId, userId) {
            return await db.listing.findFirst({
                where: {
                    userId,
                    id: listingId,
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

        async getListingByUserId(userId, page, limit) {
            const skip = Math.max(0, (page - 1) * limit) || 0;
            const currentPage = +page || 1;
            const take = +limit || 10;

            const [totalElement, contents] = await db.$transaction([
                db.listing.count({
                    where: {
                        userId: userId,
                    },
                }),
                db.listing.findMany({
                    where: {
                        userId: userId,
                    },
                    include: {
                        images: true,
                        location: true,
                        reviews: true,
                        listingAmenities: {
                            include: {
                                amenity: true,
                            },
                        },
                    },
                    skip,
                    take,
                }),
            ]);
            const totalPage = Math.ceil(totalElement / take);
            return { totalElement, currentPage, totalPage, contents };
        },

        async getCountListingByLocationId(locationId) {
            return db.listing.count({
                where: {
                    locationId,
                },
            });
        },

        async getListings(
            page,
            limit,
            keyword,
            latCoords,
            lngCoords,
            amenityIds,
            minPrice,
            maxPrice,
            locationId,
            tagId
        ) {
            const skip = Math.max(0, (page - 1) * limit);
            const currentPage = +page || 1;
            const take = +limit || 10;

            const filters = {
                AND: [{ isPublish: true }],
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

            if (amenityIds) {
                const ids = amenityIds.split(",");
                filters.AND = ids.map((id) => ({
                    listingAmenities: {
                        some: {
                            amenityId: id,
                        },
                    },
                }));
            }

            if (minPrice && maxPrice) {
                filters.price = {
                    gte: parseFloat(minPrice),
                    lte: parseFloat(maxPrice),
                };
            }

            if (minPrice && !maxPrice) {
                filters.price = {
                    gte: parseFloat(minPrice),
                    lte: 1000000000,
                };
            }

            if (!minPrice && maxPrice) {
                filters.price = {
                    gte: 100000,
                    lte: parseFloat(maxPrice),
                };
            }

            if (locationId) {
                filters.locationId = locationId;
            }

            if (tagId) {
                filters.tagId = tagId;
            }

            const [totalElement, contents] = await db.$transaction([
                db.listing.count({
                    where: filters,
                }),
                db.listing.findMany({
                    take,
                    skip,
                    orderBy: {
                        createdAt: "desc",
                    },
                    where: {
                        ...filters,
                    },
                    include: {
                        images: true,
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
                }),
            ]);

            const totalPage = Math.ceil(totalElement / take);

            return { totalElement, currentPage, totalPage, contents };
        },

        async countListingsByDate(startOfDay, endOfDay) {
            return await db.listing.count({
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                },
            });
        },

        async findTop10UsersWithMostListings() {
            const result = await db.$transaction(async (prisma) => {
                const topUsersWithListings = await db.listing.groupBy({
                    by: ["userId"],
                    _count: {
                        userId: true,
                    },
                    orderBy: {
                        _count: {
                            userId: "desc",
                        },
                    },
                    take: 10,
                });

                const userIds = topUsersWithListings.map((item) => item.userId);

                const users = await db.user.findMany({
                    where: {
                        id: { in: userIds },
                    },
                    include: {
                        // listings: true,
                        _count: {
                            select: { listings: true },
                        },
                        orderItems: {
                            select: {
                                amount: true,
                            },
                        },
                    },
                    orderBy: {
                        listings: { _count: "desc" },
                    },
                });

                return users;
            });
            return result;
        },

        async updateListing(listingId, listingUpdate) {
            return await db.listing.update({
                where: {
                    id: listingId,
                },
                data: listingUpdate,
                include: {
                    images: true,
                    location: true,
                    listingAmenities: {
                        include: { amenity: true },
                    },
                    user: true,
                },
            });
        },

        async deleteListing(listingId) {
            return await db.listing.delete({
                where: {
                    id: listingId,
                },
            });
        },

        async getNearbyListings(lat, lng, page = 1, limit = 10) {
            // Sanitize and validate parameters
            const currentPage = Math.max(1, parseInt(page, 10));
            const take = Math.max(1, parseInt(limit, 10));
            const skip = (currentPage - 1) * take;

            try {
                const listingsResult = await db.$queryRaw`
                    WITH distance_data AS (
                        SELECT
                            id,
                            ST_Distance(
                                ST_MakePoint(${lat}, ${lng})::GEOGRAPHY,
                                ST_MakePoint(latitude, longitude)::GEOGRAPHY
                            ) AS distance
                        FROM "Listing"
                        WHERE ST_Distance(
                            ST_MakePoint(${lat}, ${lng})::GEOGRAPHY,
                            ST_MakePoint(latitude, longitude)::GEOGRAPHY
                        ) < 1000000
                    ),
                    total_count AS (
                        SELECT COUNT(*) as total
                        FROM distance_data
                    )
                    SELECT id, distance, total
                    FROM distance_data, total_count
                    ORDER BY distance
                    LIMIT ${take}
                    OFFSET ${skip};
                `;

                const count =
                    listingsResult.length > 0
                        ? Number(listingsResult[0].total)
                        : 0;

                const listingIds = listingsResult.map((item) => item.id);
                const distances = listingsResult.map((item) => item.distance);

                // Fetch listings data
                const listings = await db.listing.findMany({
                    where: {
                        id: {
                            in: listingIds,
                        },
                    },
                    include: {
                        images: true,
                        user: {
                            select: {
                                fullName: true,
                                email: true,
                                username: true,
                                avatarUrl: true,
                                createdAt: true,
                                isVerify: true,
                            },
                        },
                    },
                });

                const listingsWithDistance = listings.map((item, index) => ({
                    ...item,
                    distance: distances[index],
                }));

                const totalPage = Math.ceil(count / take);

                return {
                    totalElement: count,
                    currentPage,
                    totalPage,
                    contents: listingsWithDistance,
                };
            } catch (error) {
                console.error("Error fetching nearby listings:", error);
                throw new Error("Could not fetch nearby listings");
            }
        },

        async listingsToGeo() {
            return await prisma.listing.findMany({
                select: {
                    longitude: true,
                    latitude: true,
                    title: true,
                    address: true,
                    price: true,
                    id: true,
                },
            });
        },
    },
};

export default ListingModel;

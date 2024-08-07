import fs from "fs";

import UserService from "./user.service.js";
import ListingModel from "../models/listing.model.js";
import ImageService from "./image.service.js";
import { uploader } from "../utils/uploader.js";
import redisClient from "../config/redis.client.config.js";
import { analyzeImage } from "../core/analyze.image.js";
import { deleteImage } from "../config/cloundinary.js";
import { logger } from "../config/winston.js";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const CACHE_EXPIRATION = process.env.REDIS_CACHE_EXPIRATION;
const USE_REDIS_CACHE = process.env.USE_REDIS_CACHE === "true";

const ListingService = {
    async createListing(listingData, files) {
        try {
            const existingUser = UserService.getUserById(listingData.userId);
            if (!existingUser) {
                throw Error(
                    "Không tim thấy người dùng có id = ",
                    listingData.userId
                );
            }
            const listing = await ListingModel.methods.createListing(
                listingData
            );
            if (!listing) {
                throw new Error("Có lỗi khi thêm listing");
            }
            let imageUrls = [];

            for (const file of files) {
                if (file.size > MAX_IMAGE_SIZE) {
                    throw new Error(
                        `Dung lượng của ảnh phải <= 5MB file name:  ${
                            file.originalname
                        }: is ${file.size / 1024 / 1024}MB`
                    );
                }
            }

            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path);
                const analyze = await analyzeImage(newPath?.url);
                if (analyze?.isAdultContent) {
                    imageUrls.forEach(
                        async (item) => await deleteImage(item.url)
                    );

                    await UserService.checkBanned(listingData.userId);
                    await this.deleteListing(listing.id);
                    throw new Error("Hình ảnh chứa nội dung người lớn");
                }
                if (analyze?.isRacyContent) {
                    imageUrls.forEach(
                        async (item) => await deleteImage(item.url)
                    );
                    await UserService.checkBanned(listingData.userId);
                    await this.deleteListing(listing.id);
                    throw new Error("Hình ảnh chứa nội dung không phù hợp");
                }
                imageUrls.push({
                    url: newPath?.url,
                    caption: listing.title,
                    listingId: listing.id,
                });
                fs.unlinkSync(path);
            }
            const images = await ImageService.createManyImage(imageUrls);
            return {
                ...listing,
                images,
            };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getListingById(listingId) {
        try {
            if (USE_REDIS_CACHE) {
                const cachedListing = await redisClient.get(
                    `listing:${listingId}`
                );
                if (cachedListing) {
                    logger.info("GET LISTING BY ID CACHE");
                    return JSON.parse(cachedListing);
                }
            }

            const listing = await ListingModel.methods.getListingById(
                listingId
            );
            logger.info("GET LISTING BY ID NO CACHE");

            if (!listing) {
                throw new Error("Listing not found");
            }

            if (USE_REDIS_CACHE) {
                await redisClient.setEx(
                    `listing:${listingId}`,
                    CACHE_EXPIRATION,
                    JSON.stringify(listing)
                );
            }

            return listing;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async updateListing(listingId, listingData) {
        try {
            const existingUser = await UserService.getUserById(
                listingData.userId
            );

            if (!existingUser) {
                throw Error(
                    "Không tim thấy người dùng có id = ",
                    listingData.userId
                );
            }

            const listing = await ListingModel.methods.getListingByIdAndUserId(
                listingId,
                existingUser.id
            );

            if (existingUser.role !== "ADMIN" && !listing) {
                throw Error("Bạn không phải là chủ phòng hoặc admin ");
            }

            const listingUpdate = await ListingModel.methods.updateListing(
                listingId,
                listingData
            );
            if (USE_REDIS_CACHE) {
                // Update cache
                await redisClient.del(`listing:${listingId}`);
                await redisClient.setEx(
                    `listing:${listingId}`,
                    CACHE_EXPIRATION,
                    JSON.stringify(listingUpdate)
                );
            }

            return listingUpdate;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getListingByUserId(userId, page, limit) {
        try {
            const listings = await ListingModel.methods.getListingByUserId(
                userId,
                page,
                limit
            );

            if (!listings) {
                throw new Error("Listing not found");
            }

            return listings;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deleteListing(listingId) {
        try {
            const result = await ListingModel.methods.deleteListing(listingId);

            redisClient.del(`listing:${listingId}`);

            return result;
        } catch (error) {
            logger.error(error);
            throw error;
        }
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
        try {
            const listings = await ListingModel.methods.getListings(
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
            );
            return listings;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getNearbyListings(lat, lng, page, limit) {
        try {
            return await ListingModel.methods.getNearbyListings(
                lat,
                lng,
                page,
                limit
            );
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async listingsToGeoJSON() {
        const listings = await ListingModel.methods.listingsToGeo();
        return ListingService.copyTo(listings);
    },

    copyTo(listings) {
        return {
            type: "FeatureCollection",
            features: listings.map((listing) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [listing.longitude, listing.latitude],
                },
                properties: {
                    id: listing.id,
                    title: listing.title,
                    address: listing.address,
                    price: listing.price,
                },
            })),
        };
    },
};
export default ListingService;

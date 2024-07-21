import fs from "fs";

import AmenityModel from "../models/amenity.model.js";
import { uploader } from "../utils/uploader.js";
import redisClient from "../config/redis.client.config.js";
import { logger } from "../config/winston.js";

const CACHE_EXPIRATION = process.env.REDIS_CACHE_EXPIRATION;
const USE_REDIS_CACHE = process.env.USE_REDIS_CACHE === "true";

const AmenityService = {
    async getAllAmenity() {
        try {
            if (USE_REDIS_CACHE) {
                const cachedAmenities = await redisClient.get(`amenities:all`);
                if (cachedAmenities) {
                    logger.info("cache-amenities");
                    return JSON.parse(cachedAmenities);
                }
            }
            const amenities = await AmenityModel.methods.findAllAmenity();

            if (USE_REDIS_CACHE) {
                await redisClient.setEx(
                    `amenities:all`,
                    CACHE_EXPIRATION,
                    JSON.stringify(amenities)
                );
            }
            return amenities;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async createAmenity(AmenityData) {
        try {
            const { name, description, file } = AmenityData;

            const { path } = file;
            const newPath = await uploader(path);
            fs.unlinkSync(path);

            const newAmenity = {
                name,
                description,
                iconUrl: newPath?.url,
            };

            if (USE_REDIS_CACHE) {
                redisClient.del(`amenities:all`);
            }
            return await AmenityModel.methods.createAmenity(newAmenity);
        } catch (error) {
            logger.error(error);

            throw error;
        }
    },

    async udpateAmenity(AmenityId, updatedData) {
        try {
            const { name, description, file } = updatedData;
            if (USE_REDIS_CACHE) {
                redisClient.del(`amenities:all`);
            }
            if (file) {
                const { path } = file;
                const newPath = await uploader(path);
                fs.unlinkSync(path);
                const newAmenity = {
                    name,
                    description,
                    iconUrl: newPath.id,
                };
                return await AmenityModel.methods.updateAmenity(
                    AmenityId,
                    newAmenity
                );
            } else {
                return await AmenityModel.methods.updateAmenity(AmenityId, {
                    name,
                    description,
                });
            }
        } catch (error) {
            logger.error(error);

            throw error;
        }
    },

    async deleteAmenity(AmenityId) {
        try {
            if (USE_REDIS_CACHE) {
                redisClient.del(`amenities:all`);
            }
            return await AmenityModel.methods.deleteAmenity(AmenityId);
        } catch (error) {
            logger.error(error);

            throw error;
        }
    },
};
export default AmenityService;

// const updatedListing = await prisma.listing.update({
//     where: { id: listingId },
//     data: {
//       Amenitys: {
//         connect: AmenityIds.map(id => ({ id })),
//       },
//     },
//   });

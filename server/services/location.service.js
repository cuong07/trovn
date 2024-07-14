import redisClient from "../config/redis.client.config.js";
import { logger } from "../config/winston.js";
import LocationModel from "../models/location.model.js";

const USE_REDIS_CACHE = process.env.USE_REDIS_CACHE;
const CACHE_EXPIRATION = process.env.REDIS_CACHE_EXPIRATION;

const LocationService = {
    async createLocation(locationData) {
        try {
            return await LocationModel.methods.insertLocation(locationData);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getAllLocation(page, limit, keyword) {
        try {
            return await LocationModel.methods.getLocations(
                page,
                limit,
                keyword
            );
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getLocationById(locationId) {
        try {
            if (USE_REDIS_CACHE) {
                const cachedLocation = await redisClient.get(
                    `location:${locationId}`
                );
                if (cachedLocation) {
                    logger.info("CACHE LOCATION ID");
                    return JSON.parse(cachedLocation);
                }
            }
            const location = await LocationModel.methods.getLocationById(
                locationId
            );
            if (USE_REDIS_CACHE) {
                await redisClient.setEx(
                    `location:${locationId}`,
                    CACHE_EXPIRATION,
                    JSON.stringify(location)
                );
            }
            return location;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async updateLocation(locationId, locationData) {
        try {
            return await LocationModel.methods.updateLocation(
                locationId,
                locationData
            );
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deleteLocation(locationId) {
        try {
            if (USE_REDIS_CACHE) {
                redisClient.del(`amenities:all`);
            }
            return await LocationModel.methods.deleteLocation(locationId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};
export default LocationService;

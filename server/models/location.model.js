import { logger } from "../config/winston.js";
import db from "../lib/db.js";

const LocationModel = {
    methods: {
        async getLocations(page, limit, keyword) {
            const currentPage = +page || 1;
            const take = limit ? +limit : undefined;
            const skip = take ? Math.max(0, (currentPage - 1) * take) : 0;

            const filters = {};
            logger.info(keyword);
            if (keyword) {
                filters.OR = [
                    { name: { contains: keyword, mode: "insensitive" } },
                    { city: { contains: keyword, mode: "insensitive" } },
                    { country: { contains: keyword, mode: "insensitive" } },
                ];
            }

            const [totalElement, contents] = await db.$transaction([
                db.location.count(),
                db.location.findMany({
                    where: filters,
                    take,
                    skip,
                }),
            ]);

            const totalPage = take ? Math.ceil(totalElement / take) : 1;

            return { totalElement, currentPage, totalPage, contents };
        },

        async getLocationById(locationId) {
            return await db.image.findUnique({
                where: {
                    id: locationId,
                },
            });
        },

        async updateLocation(locationId, locationData) {
            return await db.location.update({
                where: {
                    id: locationId,
                },
                data: locationData,
            });
        },

        async insertLocation(locationData) {
            return await db.location.create({
                data: locationData,
            });
        },

        async deleteLocation(locationId) {
            return await db.image.delete({
                where: {
                    id: locationId,
                },
            });
        },
    },
};

export default LocationModel;

import { statusCode } from "../config/statusCode.js";
import { logger } from "../config/winston.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import ListingService from "../services/listing.service.js";

const ListingController = {
    async createListing(req, res) {
        const { files, user } = req;
        const listingData = req.body;
        try {
            if (!user) {
                return res
                    .status(statusCode.BAD_REQUEST)
                    .json(
                        BaseResponse.success(
                            "Vui lòng đăng nhập truoc khi tạo listing",
                            null
                        )
                    );
            }
            if (files.length !== 0) {
                const newListingData = {
                    ...listingData,
                    userId: user.id,
                };
                const listing = await ListingService.createListing(
                    newListingData,
                    files
                );
                return res
                    .status(statusCode.CREATED)
                    .json(BaseResponse.success("Thành công", listing));
            }
            return res
                .status(statusCode.BAD_REQUEST)
                .json(
                    BaseResponse.error("Vui lòng thêm hình cho listing", null)
                );
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async getListingById(req, res) {
        const { id } = req.params;
        try {
            const listing = await ListingService.getListingById(id);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", listing));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async getListingByUserId(req, res) {
        const { id } = req.params;
        const { page, limit } = req.query;
        try {
            const listings = await ListingService.getListingByUserId(
                id,
                page,
                limit
            );
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", listings));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async getListings(req, res) {
        const {
            page,
            limit,
            keyword,
            latCoords,
            lngCoords,
            amenityIds,
            minPrice,
            maxPrice,
            locationId,
            tagId,
        } = req.query;
        try {
            const listings = await ListingService.getListings(
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
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", listings));
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async getNearbyListings(req, res) {
        const { page, limit, latitude, longitude } = req.query;
        try {
            const listings = await ListingService.getNearbyListings(
                latitude,
                longitude,
                page,
                limit
            );
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", listings));
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async updateListing(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const listings = await ListingService.updateListing(id, data);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", listings));
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async getListingsToGeoJSON(req, res) {
        try {
            const listings = await ListingService.listingsToGeoJSON();
            return res.status(statusCode.OK).json(listings);
            // return res
            // .status(statusCode.OK)
            // .json(BaseResponse.success("Thành công", listings));
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },
};

export default ListingController;

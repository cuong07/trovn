import ReviewModel from "../models/review.model.js";
import { logger } from "../config/winston.js";
const ReviewService = {
    async create(data) {
        try {
            const existingReview = await ReviewModel.methods.findHaveReview(
                data.listingId,
                data.userId
            );
            logger.info(JSON.stringify(existingReview));
            if (existingReview) {
                throw new Error("Bạn đã đánh giá phòng này rồi");
            }
            return await ReviewModel.methods.create(data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async findAll(page, limit, listingId) {
        try {
            return await ReviewModel.methods.findAll(page, limit, listingId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async update(id, data) {
        try {
            return await ReviewModel.methods.update(id, data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async delete(id) {
        try {
            return await ReviewModel.methods.delete(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};

export default ReviewService;

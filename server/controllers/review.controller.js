import ReviewService from "../services/review.service.js";
import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
const ReviewController = {
    async create(req, res) {
        try {
            const data = req.body;
            const { user } = req;
            const newData = {
                ...data,
                userId: user.id,
            };
            const review = await ReviewService.create(newData);
            return res
                .status(statusCode.CREATED)
                .json(BaseResponse.success("Thành công", review));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async findAll(req, res) {
        try {
            const { page, limit, listingId } = req.query;
            const reviews = await ReviewService.findAll(page, limit, listingId);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", reviews));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const review = await ReviewService.update(id, data);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", review));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const review = await ReviewService.delete(id);
            return res
                .status(statusCode.NO_CONTENT)
                .json(BaseResponse.success("Thành công", review));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },
};

export default ReviewController;

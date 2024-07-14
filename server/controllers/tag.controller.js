import { statusCode } from "../config/statusCode.js";
import { logger } from "../config/winston.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import TagService from "../services/tag.service.js";

const TagController = {
    async getTags(req, res) {
        try {
            const tags = await TagService.getTags();
            if (!tags) {
                return res
                    .status(statusCode.NOT_FOUND)
                    .json({ error: "Tags not found" });
            }
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("all tag", tags));
        } catch (error) {
            return res
                .status(statusCode.NOT_FOUND)
                .json(BaseResponse.error(error.message, error));
        }
    },
    async createTag(req, res) {
        const tagData = req.body;
        try {
            const newTag = await TagService.createTag(tagData);
            return res.status(statusCode.CREATED).json(newTag);
        } catch (error) {
            logger.error(error);
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json(BaseResponse.error(error.message, error));
        }
    },
    async deleteTag(req, res) {
        const tagId = req.params.id;
        logger.info("delete tag :", tagId);
        try {
            await TagService.deleteTag(tagId);
            return res.status(statusCode.NO_CONTENT).send();
        } catch (error) {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json(BaseResponse.error(error.message, error));
        }
    },
};
export default TagController;

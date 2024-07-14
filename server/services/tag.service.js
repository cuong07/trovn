import { logger } from "../config/winston.js";
import TagModel from "../models/tag.model.js";

const TagService = {
    async getTags() {
        try {
            return await TagModel.methods.getTags();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getTagByName(tagName) {
        try {
            return await TagModel.methods.getTagByName(tagName);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async createTag(tagData) {
        try {
            const existingTag = await TagModel.methods.getTagByName(
                tagData.name
            );
            if (!existingTag) {
                await TagModel.methods.createTag(tagData);
            } else throw "Name existed, please choose a other tag name";
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
    async deleteTag(tagId) {
        try {
            const existingTag = await TagModel.methods.getTagById(tagId);
            if (existingTag) {
                await TagModel.methods.deleteTag(tagId);
            } else throw `Tag with id: ${tagId} does not exist`;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};

export default TagService;

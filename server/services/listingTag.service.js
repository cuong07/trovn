import { logger } from "../config/winston.js";
import ListingTagModel from "../models/listingTag.model.js";
import TagModel from "../models/tag.model.js";

const ListingTagService = {
    async getListingTagByListingId(listingId) {
        try {
            const listingTag =
                await ListingTagModel.methods.getListingTagByListingId(
                    listingId
                );
            const tag = await TagModel.methods.getTagById(listingTag.tagId);
            const fullListingTag = {
                ...listingTag,
                name: tag.name,
                description: tag.description,
            };
            return fullListingTag;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getListingTagsByListingId(listingId) {
        try {
            const listingTags =
                await ListingTagModel.methods.getListingTagsByListingId(
                    listingId
                );
            const fullListingTags = listingTags.map(async (t) => {
                const tag = await TagModel.methods.getTagById(t.id);
                return { ...t, name: tag.name, description: tag.description };
            });
            return fullListingTags;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async createListingTag(listingTagData) {
        try {
            return await ListingTagModel.methods.createListingTag(
                listingTagData
            );
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deleteListingTagById(listingTagId) {
        try {
            return await ListingTagModel.methods.deleteListingTagById(
                listingTagId
            );
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deleteListingTagByTagId(tagId) {
        try {
            return await ListingTagModel.methods.deleteListingTagByTagId(tagId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};

export default ListingTagService;

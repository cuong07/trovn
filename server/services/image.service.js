import fs from "fs";

import ImageModel from "../models/image.model.js";
import { uploader } from "../utils/uploader.js";
import { logger } from "../config/winston.js";
const ImageService = {
    async createManyImage(urls) {
        try {
            return await ImageModel.methods.insertManyImage(urls);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
    async createImage(url) {
        try {
            return await ImageModel.methods.insertImage(url);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
    async deleteImage(imageId) {
        try {
            return await ImageModel.methods.deleteImageById(imageId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
    async deleteImageByListingId(listingId) {
        try {
            return await ImageModel.methods.deleteImageListingId(listingId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};
export default ImageService;

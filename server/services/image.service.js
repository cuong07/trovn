import fs from "fs";

import ImageModel from "../models/image.model.js";
import { uploader } from "../utils/uploader.js";
const ImageService = {
  async createManyImage(urls) {
    try {
      console.log();
      return await ImageModel.methods.insertManyImage(urls);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async createImage(url) {
    try {
      return await ImageModel.methods.insertImage(url);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deleteImage(imageId) {
    try {
      return await ImageModel.methods.deleteImageById(imageId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deleteImageByListingId(listingId) {
    try {
      return await ImageModel.methods.deleteImageListingId(listingId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default ImageService;

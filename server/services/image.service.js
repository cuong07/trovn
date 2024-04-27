import fs from "fs";

import ImageModel from "../models/image.model.js";
import { uploader } from "../utils/uploader.js";
const ImageService = {
  async createManyImage(files) {
    try {
      let imageUrls = [];
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        imageUrls.push({
          url: newPath.url,
          caption: listing.title,
          listingId: listing.id,
        });
        fs.unlinkSync(path);
      }
      return await ImageModel.methods.insertManyImage(imageUrls);
    } catch (error) {
      throw error;
    }
  },
  async createImage(file) {
    try {
      const { path } = file;
      const newPath = await uploader(path);
      const url = {
        url: newPath.url,
        caption: listing.title,
        listingId: listing.id,
      };
      fs.unlinkSync(path);
      return await ImageModel.methods.insertImage(url);
    } catch (error) {
      throw error;
    }
  },
  async deleteImage(imageId) {
    try {
      return await ImageModel.methods.deleteImageById(imageId);
    } catch (error) {
      throw error;
    }
  },
  async deleteImageByListingId(listingId) {
    try {
      return await ImageModel.methods.deleteImageListingId(listingId);
    } catch (error) {
      throw error;
    }
  },
};
export default ImageService;

import fs from "fs";

import UserService from "./user.service.js";
import ListingModel from "../models/listing.model.js";
import ImageService from "./image.service.js";
import { uploader } from "../utils/uploader.js";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ListingService = {
  async createListing(listingData, files) {
    try {
      const existingUser = UserService.getUserById(listingData.userId);
      if (!existingUser) {
        throw Error("Không tim thấy người dùng có id = ", listingData.userId);
      }
      const listing = await ListingModel.methods.createListing(listingData);
      if (!listing) {
        throw new Error("Có lỗi khi thêm listing");
      }
      let imageUrls = [];

      for (const file of files) {
        console.log(file);
        if (file.size > MAX_IMAGE_SIZE) {
          throw new Error(
            `Dung lượng của ảnh phải <= 5MB file name:  ${
              file.originalname
            }: is ${file.size / 1024 / 1024}MB`
          );
        }
      }

      for (const file of files) {
        const { path } = file;
        console.log(file);
        const newPath = await uploader(path);
        imageUrls.push({
          url: newPath?.url,
          caption: listing.title,
          listingId: listing.id,
        });
        fs.unlinkSync(path);
      }
      const images = await ImageService.createManyImage(imageUrls);
      return {
        ...listing,
        images,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getListingById(listingId) {
    try {
      return await ListingModel.methods.getListingById(listingId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateListing(listingId, listingData) {
    try {
      let imageUrls = [];
      const existingUser = UserService.getUserById(listingData.userId);
      if (!existingUser) {
        throw Error("Không tim thấy người dùng có id = ", listingData.userId);
      }
      const listingUpdate = await ListingModel.methods.updateListing(
        listingId,
        listingData
      );
      if (!listingUpdate) {
        throw new Error("Có lỗi khi sửa listing");
      }
      return listingUpdate;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getListingByUserId(userId) {
    try {
      return await ListingModel.methods.getListingByUserId(userId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deleteListing(listingId) {
    try {
      return await ListingModel.methods.deleteListing(listingId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getListings(page, limit, keyword) {
    try {
      return await ListingModel.methods.getListings(page, limit, keyword);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default ListingService;

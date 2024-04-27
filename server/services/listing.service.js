import fs from "fs";

import UserService from "./user.service.js";
import { uploader } from "../utils/uploader.js";
import ListingModel from "../models/listing.model.js";
import ImageService from "./image.service.js";

const ListingService = {
  async createLiting(listingData, files) {
    try {
      let imageUrls = [];
      const existingUser = UserService.getUserById(listingData.userId);
      if (!existingUser) {
        throw Error("Không tim thấy người dùng có id = ", listingData.userId);
      }
      const listing = await ListingModel.methods.createListing(listingData);
      if (!listing) {
        throw new Error("Có lỗi khi thêm listing");
      }
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        imageUrls.push({
          url: newPath.url,
          caption: listing.name,
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
      throw new Error(`Error: ${error.message}`);
    }
  },
};
export default ListingService;

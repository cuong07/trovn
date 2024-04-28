import UserService from "./user.service.js";
import ListingModel from "../models/listing.model.js";
import ImageService from "./image.service.js";

const ListingService = {
  async createLiting(listingData, files) {
    try {
      const existingUser = UserService.getUserById(listingData.userId);
      if (!existingUser) {
        throw Error("Không tim thấy người dùng có id = ", listingData.userId);
      }
      const listing = await ListingModel.methods.createListing(listingData);
      if (!listing) {
        throw new Error("Có lỗi khi thêm listing");
      }
      const images = await ImageService.createManyImage(files);
      return {
        ...listing,
        images,
      };
    } catch (error) {
      throw error;
    }
  },

  async getListingById(listingId) {
    try {
      return await ListingModel.methods.getListingById(listingId);
    } catch (error) {
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
      throw error;
    }
  },

  async getListingByUserId(userId) {
    try {
      return await ListingModel.methods.getLsitingByUserId(userId);
    } catch (error) {
      throw error;
    }
  },

  async deleteListing(listingId) {
    try {
      return await ListingModel.methods.deleteListing(listingId);
    } catch (error) {
      throw error;
    }
  },
};
export default ListingService;

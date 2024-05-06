import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import ListingService from "../services/listing.service.js";

const ListingController = {
  async createListing(req, res) {
    const { files, user } = req;
    const listingData = req.body;
    try {
      if (!user) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json(
            BaseResponse.success(
              "Vui lòng đăng nhập truoc khi tạo listing",
              null
            )
          );
      }
      if (files) {
        const newListingData = {
          ...listingData,
          userId: user.id,
        };
        const listing = await ListingService.createLiting(
          newListingData,
          files
        );
        return res
          .status(statusCode.CREATED)
          .json(BaseResponse.success("Thành công", listing));
      }
      return res
        .status(statusCode.BAD_GATEWAY)
        .json(BaseResponse.error("Vui lòng thêm hình cho listing", null));
    } catch (error) {
      return res
        .status(statusCode.BAD_GATEWAY)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getListingById(req, res) {
    const { id } = req.params;
    try {
      const listing = await ListingService.getListingById(id);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", listing));
    } catch (error) {
      return res
        .status(statusCode.BAD_GATEWAY)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getListingByUserId(req, res) {
    const { id } = req.params;
    try {
      const listings = await ListingService.getListingByUserId(id);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", listings));
    } catch (error) {
      return res
        .status(statusCode.BAD_GATEWAY)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getListings(req, res) {
    const { page, limit, keyword } = req.query;
    try {
      const listings = await ListingService.getListings(page, limit, keyword);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", listings));
    } catch (error) {
      return res
        .status(statusCode.BAD_GATEWAY)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default ListingController;

import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import ListingService from "../services/listing.service.js";

const ListingController = {
  async createListing(req, res) {
    const { files, user } = req;
    const listingData = req.body;
    console.log(user);
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
        const lsiting = await ListingService.createLiting(
          newListingData,
          files
        );
        return res
          .status(statusCode.CREATED)
          .json(BaseResponse.success("Thành công", lsiting));
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
};

export default ListingController;

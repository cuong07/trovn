import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import FavoriteService from "../services/favorite.service.js";

const FavoriteController = {
  async createFavorite(req, res) {
    const favoriteData = req.body;
    const { user } = req;
    try {
      if (!user) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json(BaseResponse.error("Vui lòng đăng nhập", null));
      }
      const newFavoriteData = {
        ...favoriteData,
        userId: user.id,
      };
      const favorite = await FavoriteService.createFavorite(newFavoriteData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", favorite));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getFavoriteByUserId(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json(BaseResponse.error("Có lỗi", null));
      }
      const favorites = await FavoriteService.getFavoriteByUserId(id);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", favorites));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getFavoriteCurrentUser(req, res) {
    const { user } = req;
    try {
      if (!user) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json(BaseResponse.error("Vui lòng đăng nhập", null));
      }
      const favorites = await FavoriteService.getFavoriteByUserId(user.id);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", favorites));
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async deleteFavorite(req, res) {
    const { id } = req.params;
    try {
      await FavoriteService.deleteFavorite(id);
      return res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default FavoriteController;

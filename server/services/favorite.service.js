import FavoriteModel from "../models/favorite.model.js";

const FavoriteService = {
  async createFavorite(favoriteData) {
    try {
      return await FavoriteModel.methods.insertFavorite(favoriteData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getFavoriteByUserId(userId) {
    try {
      return await FavoriteModel.methods.getFavoriteByUserId(userId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deleteFavorite(favoriteId) {
    try {
      return await FavoriteModel.methods.deleteFavorite(favoriteId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default FavoriteService;

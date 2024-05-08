import db from "../lib/db.js";

const FavoriteModel = {
  methods: {
    async insertFavorite(favoriteData) {
      return db.favorite.create({
        data: favoriteData,
      });
    },
    async getFavoriteByUserId(userId) {
      return db.favorite.findMany({
        where: {
          userId: userId,
        },
      });
    },
    async deleteFavorite(favoriteId) {
      return db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    },
  },
};

export default FavoriteModel;

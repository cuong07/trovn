import db from "../lib/db.js";

const FavoriteModel = {
    methods: {
        async insertFavorite(favoriteData) {
            const { listingId, userId } = favoriteData;

            const existingFavorite = await db.favorite.findFirst({
                where: {
                    listingId: listingId,
                    userId: userId,
                },
            });

            if (existingFavorite) {
                return db.favorite.delete({
                    where: {
                        id: existingFavorite.id,
                    },
                });
            }

            return db.favorite.create({
                data: favoriteData,
            });
        },

        async getFavoriteByUserId(userId) {
            return db.favorite.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    listing: {
                        include: {
                            images: true,
                        },
                    },
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

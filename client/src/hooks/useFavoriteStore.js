import { create } from "zustand";

const useFavoriteStore = create((set) => ({
    favorites: [],

    setFavorites: async (data) => {
        set((state) => ({
            ...state,
            favorites: data,
        }));
    },
}));

export default useFavoriteStore;

import { create } from "zustand";
import { createFavorite } from "../apis/favorite";

const useFavoriteStore = create((set, get) => ({
  favorites: [],

  setFavorites: async (data) => {
    set((state) => ({
      ...state,
      favorites: data,
    }));
  },
}));

export default useFavoriteStore;

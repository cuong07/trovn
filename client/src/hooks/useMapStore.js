import { create } from "zustand";

const useMapStore = create((set) => ({
  searchMap: {
    longitude: "",
    latitude: "",
  },

  setSearchLatLng: (lat, lng) => {
    set((state) => ({
      ...state,
      searchMap: {
        latitude: lat,
        longitude: lng,
      },
    }));
  },
}));

export default useMapStore;

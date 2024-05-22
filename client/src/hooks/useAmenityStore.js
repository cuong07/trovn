import { create } from "zustand";

const useAmenityStore = create((set) => ({
  amenities: [],

  setAmenities: (data) => {
    set((state) => ({
      ...state,
      amenities: data,
    }));
  },
}));

export default useAmenityStore;

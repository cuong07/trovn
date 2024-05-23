import { create } from "zustand";

const useLocationStore = create((set) => ({
  locationSearch: "",
  locations: [],

  setLocations: (data) => {
    set((state) => ({
      ...state,
      locations: data,
    }));
  },
  setLocation: (data) => {
    set((state) => ({
      ...state,
      locationSearch: data,
    }));
  },
}));

export default useLocationStore;

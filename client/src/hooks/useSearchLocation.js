import { create } from "zustand";

const useSearchLocation = create((set) => ({
  locationSearch: "",

  setLocation: (data) => {
    set((state) => ({
      ...state,
      locationSearch: data,
    }));
  },
}));

export default useSearchLocation;

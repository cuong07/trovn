import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: JSON.parse(localStorage.getItem("token")) || "",
  adsPackage: null,
  otp: "",

  setAdsPackage: (data) => {
    set((state) => ({
      ...state,
      adsPackage: data,
    }));
  },

  setUser: (data) => {
    set((state) => ({ ...state, user: data }));
  },

  setOtp: (data) => {
    set((state) => ({ ...state, otp: data }));
  },

  setToken: (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    set((state) => ({ ...state, token: data }));
  },
}));

export default useUserStore;

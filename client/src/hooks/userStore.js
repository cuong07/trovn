import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: JSON.parse(localStorage.getItem("token")) || "",
  adsPackage: null,
  otp: "",
  socketConnection: null,
  onlineUser: [],

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

  setSocketConnection: (data) => {
    set((state) => ({
      ...state,
      socketConnection: data,
    }));
  },
  setOnlineUser: (data) => {
    set((state) => ({
      ...state,
      onlineUser: data,
    }));
  },
}));

export default useUserStore;

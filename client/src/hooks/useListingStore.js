import { create } from "zustand";

const useListingStore = create((set) => ({
  listings: {
    contents: [],
    isLoading: false,
    filter: {
      keyword: "",
      amenityId: "",
    },
    pagination: {
      page: 1,
      limit: 18,
    },
    currentPage: 0,
    totalElements: 0,
  },

  filterListing: {
    data: [],
    isLoading: false,
    filter: {
      keyword: "",
      amenityId: "",
    },
    pagination: {
      page: 1,
      limit: 18,
    },
    currentPage: 0,
    totalElements: 0,
  },

  setListings: ({ data }) => {
    set((state) => ({
      listings: {
        ...state.listings,
        contents: data?.contents,
        currentPage: data?.currentPage,
        totalElements: data?.totalElement,
      },
    }));
  },

  setPagination: (pagination) => {
    set((state) => ({
      listings: {
        ...state.listings,
        pagination: {
          ...state.listings.pagination,
          ...pagination,
        },
      },
    }));
  },

  setLoadMoreListings: (data) => {
    set((state) => ({
      listings: {
        ...state.listings,
        contents: [...state.listings.contents, ...data],
      },
    }));
  },
}));

export default useListingStore;

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
      limit: 10,
    },
    currentPage: 0,
    totalElements: 0,
  },

  searchListing: {
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
  // listings

  setListings: (data) => {
    set((state) => ({
      listings: {
        ...state.listings,
        contents: [...state.listings.contents, ...data.contents],
        currentPage: data?.currentPage,
        totalElements: data?.totalElement,
      },
    }));
  },

  setListingLoading: (data) => {
    set((state) => ({
      listings: {
        ...state.listings,
        isLoading: data,
      },
    }));
  },

  setListingKeyword: (data) => {
    set((state) => ({
      listings: {
        ...state.listings,
        filter: {
          ...state.listings.filter,
          keyword: data,
        },
      },
    }));
  },

  setCurrentPageListing: (page) => {
    set((state) => ({
      listings: {
        ...state.listings,
        pagination: {
          ...state.listings.pagination,
          page: page,
        },
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
        contents: [...state.listings.contents, data?.contents],
        currentPage: data?.currentPage,
        totalElements: data?.totalElement,
      },
    }));
  },

  // search listing
  setSearchListings: (data) => {
    set((state) => ({
      searchListing: {
        ...state.searchListing,
        contents: [...state.searchListing.contents, ...data.contents],
        currentPage: data?.currentPage,
        totalElements: data?.totalElement,
      },
    }));
  },
}));

export default useListingStore;

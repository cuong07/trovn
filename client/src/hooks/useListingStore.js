import { create } from "zustand";

const useListingStore = create((set, get) => ({
    listings: {
        contents: [],
        isLoading: false,
        filter: {
            keyword: "",
            amenityIds: [],
        },
        pagination: {
            page: 1,
            limit: 20,
        },
        currentPage: 0,
        totalElement: 0,
    },

    hostListings: {
        contents: [],
        pagination: {
            page: 1,
            limit: 10,
        },
        currentPage: 0,
        totalElement: 0,
    },

    adminListings: {
        contents: [],
        isLoading: false,
        filter: {
            keyword: "",
            amenityIds: [],
        },
        pagination: {
            page: 1,
            limit: 100,
        },
        currentPage: 0,
        totalElement: 0,
    },

    searchListings: {
        contents: [],
        isLoading: false,
        filter: {
            keyword: "",
            amenityIds: [],
            locationId: "",
            minPrice: "",
            maxPrice: "",
            tagId: "",
            latCoords: "",
            lngCoords: "",
        },
        pagination: {
            page: 1,
            limit: 18,
        },
        currentPage: 0,
        totalElement: 0,
        totalPage: 0,
    },

    newListing: {
        title: "",
        description: "",
        address: "",
        longitude: "",
        latitude: "",
        price: 0,
        area: "",
        term: "",
        locationId: "",
        files: null,
        amenityConnections: [],
        tags: "",
    },

    updateListing: (key, value) =>
        set((state) => ({
            newListing: {
                ...state.newListing,
                [key]: value,
            },
        })),

    updateSomeListing: (data) => {
        set((state) => {
            const newHostListing = state.hostListings.contents.map(
                (listing) => {
                    if (listing.id === data.id) {
                        return data;
                    }
                    return listing;
                }
            );
            return newHostListing;
        });
    },
    // host
    setHostListings: (data) => {
        set((state) => ({
            hostListings: {
                ...state.hostListings,
                contents: data?.contents,
                currentPage: data?.currentPage,
                totalElement: data?.totalElement,
            },
        }));
    },

    setCurrentPageHostListing: (page, size) => {
        set((state) => ({
            hostListings: {
                ...state.hostListings,
                pagination: {
                    limit: size ?? 10,
                    page: page,
                },
            },
        }));
    },

    // listings
    setListings: (data) => {
        set((state) => ({
            listings: {
                ...state.listings,
                contents: data?.contents,
                currentPage: data?.currentPage,
                totalElement: data?.totalElement,
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
                totalElement: data?.totalElement,
            },
        }));
    },

    setListingAmenitiesId: (data) => {
        set((state) => {
            const isDataIncluded =
                state.listings.filter.amenityIds.includes(data);
            const updatedAmenityIds = isDataIncluded
                ? state.listings.filter.amenityIds.filter(
                      (item) => item !== data
                  )
                : [...state.listings.filter.amenityIds, data];

            return {
                listings: {
                    ...state.listings,
                    filter: {
                        ...state.listings.filter,
                        amenityIds: updatedAmenityIds,
                    },
                },
            };
        });
    },

    // search listing
    setSearchListings: (data) => {
        set((state) => ({
            ...state,
            searchListings: {
                ...state.searchListings,
                contents: data.contents,
                currentPage: data?.currentPage,
                totalElement: data?.totalElement,
            },
        }));
    },

    setSearchListingLoading: (isLoading) => {
        set((state) => ({
            ...state,
            searchListings: {
                ...state.searchListings,
                isLoading,
            },
        }));
    },

    setSearchListingKeyword: (data) => {
        set((state) => ({
            searchListings: {
                ...state.searchListings,
                filter: {
                    ...state.searchListings.filter,
                    keyword: data,
                },
            },
        }));
    },

    setSearchListingAmenityId: (data) => {
        set((state) => ({
            searchListings: {
                ...state.searchListings,
                filter: {
                    ...state.searchListings.filter,
                    amenityId: data,
                },
            },
        }));
    },

    setSearchListingLocationId: (data) => {
        set((state) => ({
            searchListings: {
                ...state.searchListings,
                filter: {
                    ...state.searchListings.filter,
                    locationId: data,
                },
            },
        }));
    },

    updateSearchListings: (key, value) => {
        set((state) => ({
            ...state,
            searchListings: {
                ...state.searchListings,
                filter: {
                    ...state.searchListings.filter,
                    [key]: value,
                },
            },
        }));
    },

    setSearchListingAmenitiesId: (data) => {
        set((state) => {
            const isDataIncluded =
                state.searchListings.filter.amenityIds.includes(data);
            const updatedAmenityIds = isDataIncluded
                ? state.searchListings.filter.amenityIds.filter(
                      (item) => item !== data
                  )
                : [...state.searchListings.filter.amenityIds, data];

            return {
                searchListings: {
                    ...state.searchListings,
                    filter: {
                        ...state.searchListings.filter,
                        amenityIds: updatedAmenityIds,
                    },
                },
            };
        });
    },

    clearSearchFilter: () => {
        set((state) => ({
            ...state,
            searchListings: {
                ...state.searchListings,
                filter: {
                    keyword: "",
                    amenityIds: [],
                    locationId: "",
                    minPrice: "",
                    maxPrice: "",
                    tagId: "",
                    latCoords: "",
                    lngCoords: "",
                },
            },
        }));
    },

    countSearchListingFilters: () => {
        const { filter } = get().searchListings;
        let count = 0;
        if (filter.keyword) count++;
        if (filter.amenityIds.length > 0) count++;
        if (filter.locationId) count++;
        if (filter.minPrice || filter.maxPrice) count++;
        if (filter.tagId) count++;
        if (filter.latCoords || filter.lngCoords) count++;
        return count;
    },

    setCurrentPageSearchListing: (page) => {
        set((state) => ({
            searchListings: {
                ...state.listings,
                pagination: {
                    ...state.listings.pagination,
                    page: page,
                },
            },
        }));
    },
}));

export default useListingStore;

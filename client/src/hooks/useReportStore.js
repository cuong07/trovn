import { create } from "zustand";

const useReportStore = create((set) => ({
    filters: {
        page: 1,
        limit: 1, // Updated the limit to a more reasonable number
        isActive: null,
        reporterId: null,
        reportedId: null,
    },
    reports: {
        currentPage: 0,
        totalElement: 0,
        contents: [],
        isLoading: false,
    },

    setReport: (data) => {
        set((state) => ({
            ...state,
            reports: {
                ...state.reports,
                ...data,
            },
        }));
    },

    updateReportFilter: (name, value) => {
        set((state) => ({
            ...state,
            filters: {
                ...state.filters,
                [name]: value,
            },
        }));
    },

    updatePagination: (page) => {
        set((state) => ({
            ...state,
            reports: {
                ...state.reports,
                currentPage: page,
            },
            filters: {
                ...state.filters,
                page,
            },
        }));
    },

    updateLoadMoreReport: (data) => {
        set((state) => ({
            ...state,
            reports: {
                ...state.reports,
                ...data,
                contents: [...state.reports.contents, ...data.contents],
            },
        }));
    },
}));

export default useReportStore;

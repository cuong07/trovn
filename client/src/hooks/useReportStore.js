import { create } from "zustand";

const useReportStore = create((set) => ({
    filters: {
        page: 1,
        limit: 20,
        isActive: true,
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

    removeReport: (id) => {
        set((state) => {
            const newReports = state.reports.contents.filter(
                (item) => item.id !== id
            );
            return {
                ...state,
                reports: {
                    ...state.reports,
                    contents: newReports,
                },
            };
        });
    },
}));

export default useReportStore;

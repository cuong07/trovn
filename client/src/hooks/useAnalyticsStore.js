import { create } from "zustand";

const useAnalyticsStore = create((set) => ({
    chart: {
        newListing: {
            labels: [],
            data: [],
        },
        location: {
            labels: [],
            data: [],
        },
    },
    payment: {
        thisMonth: 0,
        lastMonth: 0,
        percent: 0,
    },

    newUser: {
        thisMonth: 0,
        lastMonth: 0,
        percent: 0,
    },

    topUser: [],
    setAnalyticsNewListing: (labels, data) => {
        set((state) => ({
            ...state,
            chart: {
                ...state.chart,
                newListing: {
                    data,
                    labels,
                },
            },
        }));
    },

    setAmountPayment: (data) => {
        set((state) => ({
            ...state,
            payment: {
                ...data,
            },
        }));
    },
}));

export default useAnalyticsStore;

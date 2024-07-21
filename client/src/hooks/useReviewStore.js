import { create } from "zustand";

const useReviewStore = create((set) => ({
    filters: {
        page: 1,
        limit: 20, // Updated the limit to a more reasonable number
    },
    reviews: {
        currentPage: 0,
        totalElement: 0,
        contents: [],
    },

    setReviews: (data) => {
        set((state) => ({
            ...state,
            reviews: {
                ...state.reports,
                ...data,
            },
        }));
    },

    removeReview: (id) => {
        set((state) => {
            const newContents = state.reviews.contents.filter(
                (item) => item.id !== id
            );
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    contents: newContents,
                },
            };
        });
    },
}));

export default useReviewStore;

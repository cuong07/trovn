export const UserV1 = {
    CREATE_USER: "/user",
    GET_CURRENT_USER: "/user",
    GET_USER: "/user/:id",
    UPDATE_USER: "/user/",
    UPDATE_USER_AVATAR: "/user/avatar/",
    DELETE_USER: "/user/",
    GET_USERS: "/users",
    USER_LOGIN: "/user/login",
    GET_USER_OTP: "/user/otp",
    GET_VERIFY_EMAIL_OTP: "/user/verify",
    GET_REFRESH_TOKEN: "/user/refresh-token",
};

export const AmenityV1 = {
    CREATE_AMENITY: "/amenity",
    GET_ALL_AMENITY: "/amenities",
};

export const ListingV1 = {
    GET_LISTING: "/listings",
    GET_LISTING_FOR_ME: "/listings/for-user",
    GET_LISTING_BY_ID: "/listing/",
    CREATE_LISTING: "/listing",
    GET_LISTING_BY_USER_ID: "/listing/user/",
    UPDATE_LISTING: "/listing/",
};

export const LocationV1 = {
    CREATE_LOCATION: "/location",
    GET_LOCATIONS: "/locations",
};

export const AdvertisingV1 = {
    GET_ALL_ADVERTISING: "/advertising-packages",
};

export const PaymentV1 = {
    GET_MOMO_PAYMENT: "/payment/momo",
    GET_VNPAY_PAYMENT: "/payment/vnpay",
    GET_PAYMENTS_BY_STATUS: "/payments",
    GET_PAYMENT_USER: "/payment/user",
    DELETE_PAYMENT: "/payment/",
};

export const OrderV1 = {
    GET_ORDERS_BY_USER: "/orders",
};

export const BannerV1 = {
    CREATE_BANNER: "/banner",
    GET_BANNERS: "/banners",
    GET_BANNERS_ACTIVE: "/banners/active",
    UPDATE_BANNER_STATUS: "/banners",
};

export const TagV1 = {
    GET_TAGS: "/tag",
};

export const ConversationV1 = {
    GET_CONVERSATIONS: "/conversation",
};

export const FavoriteV1 = {
    CREATE_FAVORITE: "/favorite",
    GET_FAVORITES: "/favorites",
    DELETE_FAVORITE: "/favorite",
};
export const AnalyticsV1 = {
    GET_ANALYTICS_NEW_LISTING: "/analytics/new-listing",
    GET_ANALYTICS_AMOUNT_PAYMENT: "/analytics/amount-payment",
    GET_ANALYTICS_NEW_USER_REGISTER: "/analytics/new-user-register",
    GET_ANALYTICS_LOCATION_COUNT_LISTING: "/analytics/location-count-listing",
    GET_ANALYTICS_TOP_10_USER_WITH_MOST_LISTING:
        "/analytics/top-user-with-most-listing",
};

export const ReportV1 = {
    CREATE_REPORTS: "/reports",
    GET_REPORTS: "/reports",
    UPDATE_REPORTS: "/reports/",
    DELETE_REPORTS: "/reports/",
    UPDATE_REPORTS_ACCEPT: "/reports/accept/",
    UPDATE_REPORTS_REFUSE: "/reports/refuse/",
};
export const ReviewV1 = {
    CREATE_REVIEWS: "/reviews",
    GET_REVIEWS: "/reviews",
    UPDATE_REVIEWS: "/reviews/",
    DELETE_REVIEWS: "/reviews/",
};

export const UserV1 = {
  CREATE_USER: "/user",
  GET_CURRENT_USER: "/user",
  GET_USER: "/user/:id",
  UPDATE_USER: "/user/:id",
  DELETE_USER: "/user/:id",
  GET_USERS: "/users",
  USER_LOGIN: "/user/login",
  GET_USER_OTP: "/user/otp",
  GET_VERIFY_EMAIL_OTP: "/user/verify",
};

export const AmenityV1 = {
  CREATE_AMENITY: "/amenity",
  GET_ALL_AMENITY: "/amenities",
};

export const ListingV1 = {
  GET_LISTING: "/listings",
  GET_LISTING_BY_ID: "/listing/",
  CREATE_LISTING: "/listing",
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
};

export const OrderV1 = {
  GET_ORDERS_BY_USER: "/orders",
};

export const BannerV1 = {
  CREATE_BANNER: "/banner",
  GET_BANNERS: "/banners",
  GET_BANNERS_ACTIVE: "/banners/active",
};

export const TagV1 = {
  GET_TAGS: "/tag",
};

export const ConversationV1 = {
  GET_CONVERSATIONS: "/conversation",
};

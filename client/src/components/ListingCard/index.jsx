/* eslint-disable react/prop-types */
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { formatMoney } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Index = ({ listing, onClose }) => {
  const [isFocus, setIsFocus] = useState(true);

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        <Swiper
          navigation={isFocus}
          modules={[Navigation]}
          className="swiper-card rounded-2xl overflow-hidden mb-3"
        >
          {listing?.images?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full ">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </SwiperSlide>
          ))}
          {listing?.images?.length === 0 && (
            <div className="w-full ">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
                alt={listing.title}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          )}
        </Swiper>
        <Link
          to={`/listing/${listing.id}`}
          className="flex flex-col text-[15px] gap-y-[2px] hover:text-[#222]"
        >
          <h2 className=" font-semibold leading-[19px]">
            {listing?.title?.length > 30
              ? `${listing.title.slice(0, 30)}...`
              : listing.title}
          </h2>
          <div className="text-[#717171]">
            {listing?.address?.length > 30
              ? `${listing.address.slice(0, 30)}...`
              : listing.address}
          </div>
          <div className="mt-[6px] font-semibold leading-[19px]">
            {`${formatMoney(listing.price)} `}{" "}
            <span className="font-normal">/ Tháng</span>
          </div>
        </Link>
      </div>
      {onClose && (
        <div
          className="absolute right-2 top-2 z-50 p-2 cursor-pointer rounded-full shadow-lg bg-white"
          onClick={onClose}
        >
          <IoClose />
        </div>
      )}
    </div>
  );
};

export default Index;

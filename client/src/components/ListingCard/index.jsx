/* eslint-disable react/prop-types */
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { formatMoney } from "../../utils/helpers";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

const Index = ({ listing }) => {
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
        <div className="flex flex-col text-[15px] gap-y-[2px]">
          <h2 className=" font-semibold leading-[19px]">{listing.title}</h2>
          <div className="text-[#717171]">
            {listing?.description?.length > 30
              ? `${listing.description.slice(0, 30)}...`
              : listing.description}
          </div>
          <div className="mt-[6px] font-semibold leading-[19px]">
            {`${formatMoney(listing.price)} `}{" "}
            <span className="font-normal">/ Tháng</span>
          </div>
        </div>
      </div>
      <Link
        to={`/listing/${listing.id}`}
        className="absolute top-0 left-0 bottom-0 w-full z-10"
      />
    </div>
  );
};

export default Index;

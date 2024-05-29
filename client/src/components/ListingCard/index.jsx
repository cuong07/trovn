/* eslint-disable react/prop-types */
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { formatDateCount, formatMoney } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { createFavorite } from "../../apis/favorite";
import useFavoriteStore from "../../hooks/useFavoriteStore";
import useUserStore from "../../hooks/userStore";
import { message } from "antd";

const Index = ({ listing, onClose }) => {
  const [isFocus, setIsFocus] = useState(true);
  const { favorites } = useFavoriteStore();
  const { user } = useUserStore();
  const [toggleHeart, setToggleHeart] = useState(
    favorites?.find((i) => i.listingId === listing.id)
  );

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      return message.warning("Vui lòng đăng nhập!");
    }
    try {
      const { success } = await createFavorite(listing?.id);
      if (success) {
        setToggleHeart(!toggleHeart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div className="relative group">
      <div
        className="cursor-pointer "
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
          <div className="mt-[6px] flex justify-between">
            <div className=" font-semibold text-base leading-[19px]">
              {`${formatMoney(listing.price)} `}
              <span className="font-normal">/ Tháng</span>
            </div>
            <div className="text-xs">{formatDateCount(listing.createdAt)}</div>
          </div>
        </Link>
      </div>
      <div className=" flex gap-2 absolute right-2 top-2 z-10 ">
        {
          <div
            className="group-hover:block p-2  cursor-pointer  "
            onClick={handleToggleFavorite}
          >
            <FaHeart size={20} color={toggleHeart ? "red" : "white"} />
          </div>
        }
        {onClose && (
          <div
            className=" p-2 cursor-pointer rounded-full shadow-xl bg-white"
            onClick={onClose}
          >
            <IoClose size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

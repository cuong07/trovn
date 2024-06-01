/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Flex, Skeleton, Space } from "antd";
import { cn } from "@/utils/helpers";

const Index = ({ data, count, handleClickItem, amenityIds }) => {
  return (
    <div className="2xl:px-40 lg:px-20 md:px-10 px-4 bg-white">
      <Swiper
        // slidesPerView={}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="h-20 px-10 "
        breakpoints={{
          320: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 8,
          },
          1280: {
            slidesPerView: 10,
          },
          1536: {
            slidesPerView: count ?? 12,
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex items-center w-auto  justify-center cursor-pointer"
            onClick={() => handleClickItem(item.id)}
          >
            <div
              className={cn(
                "gap-2 hover:border-b-2 border-black flex flex-col text-sm justify-between hover:font-medium transition-all",
                amenityIds?.includes(item.id) && "border-b-2 font-semibold"
              )}
            >
              <div className="text-center">
                <img
                  src={item.iconUrl}
                  alt={item.name}
                  className="w-6 h-6 mx-auto"
                />
              </div>
              <div className="text-center lg:text-base text-xs ">
                {item.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
        {data?.length === 0 &&
          new Array(20).fill(0).map((_, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center  justify-center cursor-pointer"
            >
              <Space align="center">
                <Flex vertical align="center" gap={8}>
                  <Skeleton.Avatar active size="small" />
                  <Skeleton.Button active size="default" />
                </Flex>
              </Space>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Index;

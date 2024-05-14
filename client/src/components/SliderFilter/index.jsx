/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Flex, Skeleton, Space } from "antd";

const Index = ({ data }) => {
  return (
    <Swiper
      slidesPerView={14}
      spaceBetween={50}
      navigation={true}
      modules={[Navigation]}
      className="h-20 mx-40 px-10 bg-white"
    >
      {data?.map((item) => (
        <SwiperSlide
          key={item.id}
          className="flex items-center  justify-center cursor-pointer"
        >
          <div className=" gap-2 hover:border-b-2 border-black hover:font-medium transition-all">
            <div className="text-center">
              <img
                src={item.iconUrl}
                alt={item.name}
                className="w-6 h-6 mx-auto"
              />
            </div>
            <div className="text-center">{item.name}</div>
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
  );
};

export default Index;

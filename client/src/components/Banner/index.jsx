import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
const Index = () => {
  return (
    <>
      <Swiper
        className="banner-swiper h-[500px] mt-20"
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {new Array(10).fill(0).map((_, index) => (
          <SwiperSlide className="bg-zinc-500" key={index}>
            Slide {index + 1}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Index;
/* eslint-disable react/prop-types */
import { Descriptions, Drawer, Image } from "antd";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { formatMoney, getTerm } from "../../utils/helpers";
import { AmenitiesList } from "..";

// import required modules

const DescriptionItem = ({ title, content }) => (
  <div className="grid gap-3">
    <p className="text-[#00000045]">{title}:</p>
    {content}
  </div>
);
const Index = ({ onClose, open, listing }) => {
  const items = [
    {
      key: "1",
      label: "Tiêu đề",
      children: listing.title,
    },
    {
      key: "2",
      label: "Gía phòng",
      children: formatMoney(listing.price),
    },
    {
      key: "3",
      label: "Loại hình cho thuê",
      children: getTerm(listing.term),
    },
    {
      key: "4",
      label: "Địa chỉ",
      span: 2,
      children: listing.address,
    },
  ];
  return (
    <div>
      <Drawer
        width={860}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <div className="grid gap-4">
          <div className="w-full grid grid-cols-2 gap-4 ">
            <div className="h-[400px]">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper w-full h-full rounded-xl overflow-hidden"
              >
                {listing.images.map((item) => (
                  <SwiperSlide key={item.id} className="!w-full">
                    <Image
                      wrapperClassName="!h-full"
                      src={item.url}
                      alt={item?.caption}
                      className="!h-full !w-full !object-fill !aspect-square"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <Descriptions
              title="Thông tin chi tiết"
              layout="vertical"
              items={items}
              size="middle"
              column={1}
            />
          </div>
          <DescriptionItem
            title="Tiện ích "
            content={
              <AmenitiesList listingAmenities={listing?.listingAmenities} />
            }
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Index;

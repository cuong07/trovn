import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import useMessage from "antd/es/message/useMessage";
import { Avatar, Empty } from "antd";
import { CiMail } from "react-icons/ci";
import moment from "moment";
import { LuDot } from "react-icons/lu";

import { getListing } from "../../apis/listing";
import { Button, ImagePreview, MapListing } from "../../components";
import { formatMoney, getTerm } from "../../utils/helpers";
import Loading from "./Loading";

import "moment/locale/vi";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listing, setListing] = useState({});
  const [messageApi, contextHolder] = useMessage();

  const { id } = useParams();
  useEffect(() => {
    moment.locale("vi");

    (async () => {
      try {
        setIsLoading(true);
        const res = await getListing(id);
        setListing(res.data);
        setIsLoading(false);
        console.log(res.status);
        if (res.success) {
          messageApi.open({
            type: "success",
            content: res.message,
          });
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "This is an error message",
        });
      }
    })();
  }, [id, messageApi]);

  return (
    <>
      {contextHolder}
      <div className="container h-full mx-auto lg:px-40 px-4">
        {!isLoading && (
          <>
            <div className="h-[560px]">
              <ImagePreview images={listing?.images} />
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-2 h-[2000px]">
                <div className=" py-8">
                  <h2 className="text-[22px] font-semibold">{listing.title}</h2>
                  <div className="flex gap-1 items-center">
                    {getTerm(listing?.term)} <LuDot /> {listing?.area}m
                    <sup>2</sup>
                  </div>
                  <div className="font-semibold text-base flex gap-2 items-center">
                    <FaStar />
                    {listing?.reviews?.length > 0
                      ? `${listing?.reviews?.length} review`
                      : "Chưa có review nào"}
                  </div>
                </div>

                <div className="py-6 border-y-[1px] flex items-center gap-2">
                  <div>
                    <Avatar
                      size={64}
                      src={listing?.user?.avatarUrl}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base leading-5 mb-1">
                      Chủ nhà {listing?.user?.username}
                    </h2>
                    <p className="text-[#717171]">
                      {moment(listing?.user?.createdAt).format("LL")}
                    </p>
                  </div>
                </div>
                <p className="text-base leading-6 py-6 border-b-[1px]">
                  {listing?.description}
                </p>
                <div className=" py-6 border-b-[1px]">
                  <h2 className="text-[22px] font-semibold leading-[26px] mb-6">
                    Phòng này có gì
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {listing?.listingAmenities?.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div>
                          <img
                            src={item.amenity.iconUrl}
                            alt={item.amenity.name}
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="text-base leading-5">
                          {item.amenity.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className=" py-6 border-b-[1px]">
                  <h2 className="text-[22px] font-semibold leading-[26px] mb-6">
                    Bạn sẽ ở dâu
                  </h2>
                  <div>
                    <div className="h-[600px] rounded-lg overflow-hidden ">
                      <MapListing listing={listing} />
                    </div>
                    <div className="text-base font-semibold mt-6">
                      {listing?.address}
                    </div>
                  </div>
                </div>
                <div className=" py-6 border-b-[1px]">
                  <h2 className="text-[22px] font-semibold leading-[26px] mb-6">
                    Đánh giá
                  </h2>
                  {listing?.reviews?.length === 0 && <Empty />}
                  {}
                </div>
              </div>
              <div className="col-span-1 relative pl-20  mt-10">
                <div className="relative h-full ">
                  <div className=" sticky top-[100px] border-t-4 border-[#A86FF7]">
                    <div className="w-full p-4 h-[300px] shadow-md flex flex-col gap-4 ">
                      <div>
                        <div className="uppercase tracking-widest mb-2 ">
                          Giá phòng
                        </div>
                        <div className="text-4xl font-medium leading-none ">
                          {formatMoney(listing.price)}{" "}
                          <span className="font-light text-2xl">/ Tháng</span>
                        </div>
                      </div>
                      <div>
                        <div className="uppercase tracking-widest mb-2 ">
                          Thông tin liên hệ
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link
                            target="_blank"
                            to={`https://zalo.me/${listing?.user?.phoneNumber}`}
                          >
                            <Button type="primary">Zalo</Button>
                          </Link>
                          <Link to={`tel:${listing?.user?.phoneNumber}`}>
                            <Button type="default">
                              <IoCallOutline className="mr-2 " size={18} />
                              {listing?.user?.phoneNumber}
                            </Button>
                          </Link>
                          <Link to={`mail:to${listing?.user?.email}`}>
                            <Button type="default">
                              <CiMail className="mr-2 " size={18} />
                              {listing?.user?.email}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default Index;

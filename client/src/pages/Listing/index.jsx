import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoCallOutline, IoTimeOutline } from "react-icons/io5";
import { FaChartArea, FaStar } from "react-icons/fa";
import useMessage from "antd/es/message/useMessage";
import { Avatar, Empty, message } from "antd";
import { CiChat1, CiMail } from "react-icons/ci";
import moment from "moment";
import { LuDot } from "react-icons/lu";

import { getListing } from "@/apis/listing";
import { AmenitiesList, Button, ImagePreview, MapListing } from "@/components";
import { formatMoney, getTerm } from "@/utils/helpers";
import Loading from "./Loading";

import "moment/locale/vi";
import useUserStore from "@/hooks/userStore";
import BuyBox from "./BuyBox";

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listing, setListing] = useState({});
    const { user } = useUserStore();
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
            <div className="container h-full mx-auto lg:px-40 px-4 py-10">
                {!isLoading && (
                    <>
                        <div className="md:h-[560px] h-auto">
                            <ImagePreview images={listing?.images} />
                        </div>
                        <div className="md:hidden flex w-full">
                            <BuyBox listing={listing} user={user} />
                        </div>
                        <div className="grid md:grid-cols-3">
                            <div className="col-span-2 ">
                                <div className=" py-8">
                                    <h2 className="text-[22px] font-semibold">
                                        {listing.title}
                                    </h2>
                                    <div className="flex gap-1 items-center text-base">
                                        <IoTimeOutline size={18} />{" "}
                                        {getTerm(listing?.term)} <LuDot />{" "}
                                        <FaChartArea size={18} />{" "}
                                        {listing?.area}m<sup>2</sup>
                                    </div>
                                    <div className="font-semibold text-base flex gap-2 items-center">
                                        <FaStar />
                                        {listing?.reviews?.length > 0
                                            ? `${listing?.reviews?.length} review`
                                            : "Chưa có review nào"}
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {listing?.listingTags?.map((item) => (
                                            <span
                                                key={item.id}
                                                className="py-1 px-2 rounded-md hover:bg-slate-100 cursor-pointer bg-slate-200"
                                            >
                                                #{item.tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="py-6 border-y-[1px] flex items-center gap-2">
                                    <Link
                                        to={`/user/info/${listing?.user?.id}`}
                                    >
                                        <Avatar
                                            size={64}
                                            src={listing?.user?.avatarUrl}
                                            alt="avatar"
                                        />
                                    </Link>
                                    <div>
                                        <h2 className="font-semibold text-base leading-5 mb-1">
                                            Chủ nhà {listing?.user?.username}
                                        </h2>
                                        <p className="text-[#717171]">
                                            {moment(
                                                listing?.user?.createdAt
                                            ).format("LL")}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base leading-6 py-6 border-b-[1px]">
                                    <h2 className="text-[22px] font-semibold leading-[26px] mb-6">
                                        Thông tin chi tiết
                                    </h2>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: listing?.description,
                                        }}
                                    />
                                </p>
                                <div className=" py-6 border-b-[1px]">
                                    <h2 className="text-[22px] font-semibold leading-[26px] mb-6">
                                        Phòng này có gì
                                    </h2>
                                    <AmenitiesList
                                        listingAmenities={
                                            listing?.listingAmenities
                                        }
                                    />
                                </div>
                                <div className=" py-6 border-b-[1px]">
                                    <h2 className="text-[22px] font-semibold leading-[26px] mb-6">
                                        Bạn sẽ ở dâu
                                    </h2>
                                    <div>
                                        <div className="h-[600px] rounded-lg overflow-hidden ">
                                            {listing && (
                                                <MapListing
                                                    latitude={listing.latitude}
                                                    longitude={
                                                        listing.longitude
                                                    }
                                                />
                                            )}
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
                                    {listing?.reviews?.length === 0 && (
                                        <Empty />
                                    )}
                                </div>
                            </div>
                            <div className="col-span-1 relative pl-20  mt-10 md:flex hidden">
                                <BuyBox listing={listing} user={user} />
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

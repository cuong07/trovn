import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { FaChartArea, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import useMessage from "antd/es/message/useMessage";
import { Avatar, Button, Empty, message, Rate, Tooltip } from "antd";
import moment from "moment";
import { LuDot } from "react-icons/lu";

import { getListing } from "@/apis/listing";
import { AmenitiesList, ImagePreview, MapListing } from "@/components";
import { getTerm } from "@/utils/helpers";
import Loading from "./Loading";

import "moment/locale/vi";
import useUserStore from "@/hooks/useUserStore";
import BuyBox from "./BuyBox";
import { BiShare } from "react-icons/bi";
import { createFavorite } from "@/apis/favorite";
import useFavoriteStore from "@/hooks/useFavoriteStore";
import { createReview, deleteReview, getReviews } from "@/apis/reviews";
import useReviewStore from "@/hooks/useReviewStore";
import { BsThreeDots } from "react-icons/bs";
moment.locale("vi");

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [listing, setListing] = useState({});
    const {
        reviews: { contents },
        setReviews,
        removeReview,
    } = useReviewStore();
    const { user } = useUserStore();
    const [messageApi, contextHolder] = useMessage();
    const { favorites } = useFavoriteStore();
    const [reviewContent, setReviewContent] = useState();
    const [rating, setRating] = useState(0);
    const { id } = useParams();
    const [toggleHeart, setToggleHeart] = useState(
        favorites?.find((i) => i.listingId === id)
    );

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const [res1, res2] = await Promise.all([
                    getListing(id),
                    getReviews(id),
                ]);
                setListing(res1.data);
                setReviews(res2.data);
                console.log(res2.data);
                setIsLoading(false);
                if (res1.success) {
                    messageApi.open({
                        type: "success",
                        content: res1.message,
                    });
                }
            } catch (error) {
                messageApi.open({
                    type: "error",
                    content: "This is an error message",
                });
                console.log(error);
            }
        })();
    }, [id, messageApi, setReviews]);

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

    const handleSendReview = async () => {
        try {
            const newReview = {
                rating,
                content: reviewContent,
                listingId: id,
            };
            setReviewLoading(true);
            const { data, success } = await createReview(newReview);

            if (!success) {
                message.error("Có lỗi khi thêm đánh giá");
            }
            const res = await getReviews(id);
            setReviews(res.data);
            setReviewContent("");
            setRating(0);
            setReviewLoading(false);
        } catch (error) {
            setReviewLoading(false);
            message.error(error.response.data.message);
            console.log(error);
        }
    };

    const handleRemoveReview = async (id) => {
        try {
            setReviewLoading(true);
            await deleteReview(id);
            removeReview(id);
            setReviewLoading(false);
        } catch (error) {
            setReviewLoading(false);
            console.log(error);
            message.error(error.message);
        }
    };

    const handleChangeReview = (e) => {
        setReviewContent(e.target.value);
    };

    console.log(contents);

    return (
        <>
            {contextHolder}
            <div className="container h-full mx-auto lg:px-40 px-4 ">
                {!isLoading && (
                    <>
                        <div className="py-4 flex justify-between">
                            <div className="font-semibold text-xl">
                                {listing.title}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2 items-center cursor-pointer">
                                    <BiShare size={20} />
                                    <span className="font-semibold underline">
                                        Chia sẻ
                                    </span>
                                </div>
                                <div
                                    className="flex gap-2 items-center cursor-pointer "
                                    onClick={handleToggleFavorite}
                                >
                                    <div className="group-hover:block   ">
                                        {toggleHeart ? (
                                            <FaHeart size={20} color={"red"} />
                                        ) : (
                                            <FaRegHeart size={20} />
                                        )}
                                    </div>
                                    <span className="font-semibold underline">
                                        Lưu
                                    </span>
                                </div>
                            </div>
                        </div>
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
                                            Chủ nhà{" "}
                                            {listing?.user?.fullName ||
                                                listing?.user?.username}
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
                                    <div className="flex flex-col gap-8">
                                        <div>
                                            <textarea
                                                name=""
                                                id=""
                                                className="w-full rounded-md border p-2 text-base"
                                                cols="30"
                                                rows="4"
                                                placeholder="Thêm đánh giá..."
                                                value={reviewContent}
                                                onChange={handleChangeReview}
                                            ></textarea>
                                            <Rate
                                                allowHalf
                                                defaultValue={rating}
                                                onChange={(value) =>
                                                    setRating(value)
                                                }
                                            />
                                        </div>
                                        <Button
                                            loading={reviewLoading}
                                            type="primary"
                                            className="h-12 w-fit"
                                            onClick={handleSendReview}
                                        >
                                            Gửi đánh giá
                                        </Button>
                                    </div>
                                    {contents?.length === 0 && <Empty />}
                                    {contents?.length > 0 && (
                                        <div className="px-4 mt-4">
                                            {contents.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="py-4 group"
                                                >
                                                    <div className="transition-all flex justify-between">
                                                        <Link
                                                            to={`/user/info/${item.user.id}`}
                                                            className="flex gap-3"
                                                        >
                                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                                <img
                                                                    className="w-full h-full aspect-square object-cover "
                                                                    src={
                                                                        item
                                                                            .user
                                                                            .avatarUrl
                                                                    }
                                                                    alt={
                                                                        item
                                                                            .user
                                                                            .fullName
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <h2 className="font-semibold text-lg">
                                                                    {item.user
                                                                        .fullName ||
                                                                        "No name"}
                                                                </h2>
                                                                <p className="text-xs">
                                                                    {moment(
                                                                        item.createdAt
                                                                    )
                                                                        .endOf(
                                                                            "day"
                                                                        )
                                                                        .fromNow()}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                        {item.user?.id ===
                                                            user?.id && (
                                                            <div className="group-hover:block transition-all hidden cursor-pointer text-lg hover:color-[#50C878]">
                                                                <Tooltip
                                                                    placement="bottomRight"
                                                                    title={
                                                                        <div className="p-2 text-black">
                                                                            <Button
                                                                                type="text"
                                                                                className=""
                                                                                loading={
                                                                                    reviewLoading
                                                                                }
                                                                                onClick={() =>
                                                                                    handleRemoveReview(
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                Xóa
                                                                            </Button>
                                                                        </div>
                                                                    }
                                                                    arrow
                                                                    rootClassName="p-0"
                                                                    overlayClassName="p-0 bg-white"
                                                                    color="#fff"
                                                                >
                                                                    <BsThreeDots />
                                                                </Tooltip>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mt-2">
                                                        <Rate
                                                            value={item.rating}
                                                            disabled
                                                            className="text-sm"
                                                        />
                                                        <p>{`" ${item.content}`}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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

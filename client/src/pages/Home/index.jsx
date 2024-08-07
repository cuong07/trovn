/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Banner, SliderFilter } from "@/components";
import { getListings } from "@/apis/listing";
import useListingStore from "@/hooks/useListingStore";
import ProductList from "./ProductList";

import useAmenityStore from "@/hooks/useAmenityStore";
import { getBannerActive } from "@/apis/banner";
import { Empty, Skeleton } from "antd";
import { getFavorites } from "@/apis/favorite";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { cn } from "@/utils/helpers";
import { useSearchParams } from "react-router-dom";
import useUserStore from "@/hooks/useUserStore";
import { getCurrentUser } from "@/apis/user";

const Index = () => {
    const [banners, setBanners] = useState([]);
    let [searchParams] = useSearchParams();
    const { user } = useUserStore();

    const {
        listings: {
            contents,
            currentPage,
            isLoading,
            totalElement,
            filter: { amenityIds },
            pagination: { page, limit },
        },
        setListingAmenitiesId,
        setCurrentPageListing,
    } = useListingStore();
    const { amenities } = useAmenityStore();
    const { setToken } = useUserStore();

    const handleClickItem = async (id) => {
        try {
            setListingAmenitiesId(id);
            await getListings();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            setToken(token);
            (async () => {
                await getCurrentUser();
            })();
        }
    }, [searchParams]);

    useEffect(() => {
        (async () => {
            await getListings();
        })();
    }, [page]);

    useEffect(() => {
        try {
            (async () => {
                const { data } = await getBannerActive();
                if (user) {
                    await getFavorites();
                }
                setBanners(data);
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleLoadMore = async () => {
        setCurrentPageListing(currentPage + 1);
    };

    const handlePrev = async () => {
        setCurrentPageListing(currentPage - 1);
    };

    return (
        <div>
            <div className="fixed top-[80px] z-40 left-0 right-0">
                <SliderFilter
                    data={amenities}
                    handleClickItem={handleClickItem}
                    amenityIds={amenityIds}
                    count={12}
                />
            </div>
            <div className="h-[50%]">
                <Banner banners={banners} />
            </div>
            <div className="mt-20 md:px-20 px-6">
                {!isLoading && <ProductList data={contents} />}
                {isLoading && (
                    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6">
                        {new Array(20).fill(0).map((_, index) => (
                            <div key={index}>
                                <div className="w-full mb-2 rounded-xl animate-pulse aspect-square bg-[#F0F0F0]"></div>
                                <Skeleton className=" animate-pulse" />
                            </div>
                        ))}
                    </div>
                )}
                {contents.length === 0 && !isLoading && (
                    <Empty description="Không tìm thấy phòng nào có các tiện ích trên!" />
                )}
            </div>

            {contents.length < totalElement && (
                <div
                    className={cn(
                        "flex   mt-20 mx-20 justify-between",
                        currentPage === 1 && "justify-end"
                    )}
                >
                    {currentPage !== 1 && (
                        <button
                            className="w-[300px] hover:bg-slate-100 transition-all flex h-12 border rounded-md shadow-sm  items-center justify-center text-base gap-2"
                            onClick={handlePrev}
                        >
                            <BiArrowToLeft size={24} />
                            Trang trước
                        </button>
                    )}
                    {contents.length !== 0 && contents.length === limit && (
                        <button
                            className="w-[300px] hover:bg-slate-100 transition-all  flex h-12 border rounded-md shadow-sm  items-center justify-center text-base gap-2"
                            onClick={handleLoadMore}
                        >
                            Trang tiếp <BiArrowToRight size={24} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Index;

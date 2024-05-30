/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Banner, Button, SliderFilter } from "@/components";
import { getAllAmenity } from "@/apis/amenities";
import { getListings } from "@/apis/listing";
import useListingStore from "@/hooks/useListingStore";
import ProductList from "./ProductList";

import useAmenityStore from "@/hooks/useAmenityStore";
import { getBannerActive } from "@/apis/banner";
import { Skeleton } from "antd";
import { getFavorites } from "@/apis/favorite";

const TOKEN = JSON.parse(localStorage.getItem("token"));

const Index = () => {
  const [banners, setBanners] = useState([]);
  const {
    listings: {
      contents,
      currentPage,
      isLoading,
      totalElements,
      filter: { amenityIds },
      pagination: { page, limit },
    },
    setListingAmenitiesId,
    setCurrentPageListing,
  } = useListingStore();
  const { amenities } = useAmenityStore();

  const handleClickItem = async (id) => {
    try {
      setListingAmenitiesId(id);
      const { data } = await getListings();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { success } = await getListings();
    })();
  }, [page]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getBannerActive();
        if (TOKEN) {
          await getFavorites();
        }
        setBanners(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleLoadMore = () => {
    setCurrentPageListing(currentPage + 1);
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
      <div className="mt-20">
        {!isLoading && <ProductList data={contents} />}
        {isLoading && (
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-20 px-6 gap-6">
            {new Array(20).fill(0).map((_, index) => (
              <div key={index}>
                <div className="w-full mb-2 rounded-xl animate-pulse aspect-square bg-[#F0F0F0]"></div>
                <Skeleton className=" animate-pulse" />
              </div>
            ))}
          </div>
        )}
      </div>
      {contents.length < totalElements && (
        <div className="flex justify-center">
          <Button type="primary" className="w-[300px]" onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;

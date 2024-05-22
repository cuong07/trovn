/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Banner, Button, SliderFilter } from "../../components";
import { getAllAmenity } from "../../apis/amenities";
import { getListings } from "../../apis/listing";
import useListingStore from "../../hooks/useListingStore";
import ProductList from "./ProductList";

import useAmenityStore from "../../hooks/useAmenityStore";
import { getBannerActive } from "../../apis/banner";

const Index = () => {
  const [banners, setBanners] = useState([]);
  const {
    setListings,
    listings: {
      contents,
      currentPage,
      totalElements,
      pagination: { page, limit },
    },
    setCurrentPageListing,
    setListingLoading,
  } = useListingStore();
  const { amenities } = useAmenityStore();

  useEffect(() => {
    (async () => {
      setListingLoading(true);
      const { data } = await getListings();
      setListingLoading(false);
      setListings(data);
    })();
  }, [page]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getBannerActive();
        setBanners(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(banners);
  const handleLoadMore = () => {
    setCurrentPageListing(currentPage + 1);
  };

  return (
    <div>
      <div className="fixed top-[80px] z-40 left-0 right-0">
        <SliderFilter data={amenities} />
      </div>
      <div className="h-[50%]">
        <Banner banners={banners} />
      </div>
      <div className="mt-20">
        <ProductList data={contents} />
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

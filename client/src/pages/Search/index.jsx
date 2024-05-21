import { useEffect } from "react";
import useListingStore from "../../hooks/useListingStore";
import { getFilterListing, getListings } from "../../apis/listing";
import ProductList from "../Home/ProductList";
import { MapSearch, SliderFilter } from "../../components";
import useAmenityStore from "../../hooks/useAmenityStore";
import { CiFilter } from "react-icons/ci";
import { Skeleton } from "antd";

const Index = () => {
  const { amenities } = useAmenityStore();

  const {
    searchListings: { contents, filter, isLoading },
    setSearchListings,
    setSearchListingLoading,
  } = useListingStore();
  const { keyword } = filter;
  useEffect(() => {
    (async () => {
      setSearchListingLoading(true);
      const { data } = await getFilterListing();
      setSearchListingLoading(false);
      setSearchListings(data);
    })();
  }, [keyword, setSearchListings, setSearchListingLoading]);
  console.log(isLoading);
  return (
    <div>
      <div className=" grid grid-cols-5">
        <div className="ml-20 flex items-center">
          <div className="col-span-1 w-fit flex items-center leading-5 gap-2 py-2 px-4 border cursor-pointer hover:bg-slate-50 rounded-lg ">
            <CiFilter size={32} />
            Filter
          </div>
        </div>
        <div className="col-span-4">
          <SliderFilter data={amenities} count={10} />
        </div>
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <ProductList data={contents} column={3} />
          {isLoading && (
            <div className="grid grid-cols-3 px-20 gap-6">
              {new Array(10).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="w-full mb-2 rounded-xl animate-pulse aspect-square bg-[#F0F0F0]"></div>
                  <Skeleton className=" animate-pulse" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-2 relative h-full">
          <div className="sticky top-20 ">
            <div className="h-screen">
              {contents.length > 0 && <MapSearch listings={contents} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

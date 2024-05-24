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
      const { data } = await getFilterListing();
      // setSearchListings(data);
    })();
  }, [keyword, setSearchListings, setSearchListingLoading]);

  return (
    <div className="">
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
          {!isLoading && <ProductList data={contents} column={3} />}
          {contents?.length === 0 && !isLoading && (
            <div className="px-20">
              <h1 className="font-semibold leading-7 text-2xl ">
                Không có kết quả tìm kiếm phù hợp
              </h1>
              <p className="mt-3 text-base leading-[24px]">
                Hãy thử thay đổi hoặc xóa một số bộ lọc hoặc điều chỉnh khu vực
                tìm kiếm của bạn.
              </p>
            </div>
          )}
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
        <div className="col-span-2 relative flex-1 ">
          <div className="sticky top-20 h-full  ">
            <div className=" h-[800px] rounded-lg ">
              <MapSearch listings={contents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useEffect, useState } from "react";
import useListingStore from "@/hooks/useListingStore";
import { getFilterListing, getListings } from "@/apis/listing";
import ProductList from "../Home/ProductList";
import { MapSearch, SliderFilter } from "@/components";
import useAmenityStore from "@/hooks/useAmenityStore";
import { CiFilter, CiSquareRemove } from "react-icons/ci";
import { Modal, Skeleton, Slider } from "antd";
import { useDebounce } from "use-debounce";
import { formatCurrency, formatMoney } from "@/utils/helpers";
import useMapStore from "@/hooks/useMapStore";

const Index = () => {
  const { amenities } = useAmenityStore();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [price, setPrice] = useState([1000000, 5000000]);
  const [priceDebounce] = useDebounce(price, 300);

  const onShow = () => {
    setIsShowFilter(true);
  };

  const onClose = () => {
    setIsShowFilter(false);
  };

  const {
    searchListings: { contents, filter, isLoading },
    setSearchListings,
    setSearchListingLoading,
    updateSearchListings,
    setSearchListingAmenitiesId,
    clearSearchFilter,
    countSearchListingFilters,
  } = useListingStore();
  const {
    keyword,
    amenityIds,
    minPrice,
    maxPrice,
    locationId,
    tagId,
    lngCoords,
    latCoords,
  } = filter;
  latCoords;
  useEffect(() => {
    (async () => {
      await getFilterListing();
    })();
  }, [
    keyword,
    setSearchListings,
    minPrice,
    locationId,
    tagId,
    maxPrice,
    setSearchListingLoading,
    latCoords,
    lngCoords,
  ]);

  useEffect(() => {
    updateSearchListings("minPrice", priceDebounce[0]);
    updateSearchListings("maxPrice", priceDebounce[1]);
  }, [priceDebounce, updateSearchListings]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);
  console.log(filter);

  const handleClickItem = async (id) => {
    try {
      setSearchListingAmenitiesId(id);

      const { data } = await getFilterListing();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-5">
        <div className="ml-20 gap-4 flex  items-center">
          <div
            className="col-span-1 w-fit  relative flex items-center leading-5 gap-2 py-2 px-4 border cursor-pointer hover:bg-slate-50 rounded-lg "
            onClick={onShow}
          >
            <CiFilter size={32} />
            Bộ lọc
            {countSearchListingFilters() > 0 && (
              <div className="absolute border-2 border-black rounded-lg  top-0 right-0 w-full h-full">
                <div className="absolute -right-2 -top-2 bg-black w-5 flex items-center justify-center h-5 rounded-full font-bold text-xs text-white">
                  {countSearchListingFilters()}
                </div>
              </div>
            )}
          </div>

          <div
            className="col-span-1 w-fit flex items-center leading-5 gap-2 py-2 px-4 border cursor-pointer hover:bg-slate-50 rounded-lg "
            onClick={clearSearchFilter}
          >
            <CiSquareRemove size={32} />
            Xóa bộ lọc
          </div>
        </div>
        <div className="col-span-4">
          <SliderFilter
            data={amenities}
            count={8}
            handleClickItem={handleClickItem}
            amenityIds={amenityIds}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 bg-white">
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
          <div className="sticky top-20 ">
            <div className=" rounded-lg  h-[900px] ">
              <MapSearch listings={contents} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className="text-center leading-5 font-semibold text-base">
            Bộ lọc
          </div>
        }
        centered
        open={isShowFilter}
        closable
        // onOk={() => setModal2Open(false)}
        onCancel={onClose}
      >
        <div>
          <div>
            <div className="text-[22px] font-semibold leading-[26px]">
              Khoảng giá
            </div>
            <p className="text-[14px] leading-[18px] mt-1">
              Giá thuê trên tháng trước phí và thuế
            </p>
          </div>
          <Slider
            range={{
              draggableTrack: true,
            }}
            // value={price}
            tooltip={{
              formatter: (value) => <div>{formatMoney(value)}</div>,
            }}
            min={100000}
            max={100000000}
            onChange={(data) => setPrice(data)}
            step={100000}
            defaultValue={price}
          />
        </div>
        <div>
          <div className="text-[22px] font-semibold leading-[26px]">
            Tiện nghi
          </div>
          <div className="grid grid-cols-2 gap-4">
            {amenities?.map((item) => (
              <div key={item.id} className="flex gap-2">
                <img src={item?.iconUrl} className="w-6 h-6" alt="Amenities" />
                <div>{item?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Index;

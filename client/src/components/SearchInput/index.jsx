import { AutoComplete } from "antd";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import qs from "query-string";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

import { Button } from "..";
import { cn } from "@/utils/helpers";
import useListingStore from "@/hooks/useListingStore";
import useLocationStore from "@/hooks/useLocationStore";
import useMapStore from "@/hooks/useMapStore";
import { getLocations } from "@/apis/location";

const Index = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 500);
  const { locations } = useLocationStore();
  const [searchLocation, setSearchLocation] = useState(locations);
  const navigate = useNavigate();
  const { setSearchListingKeyword, updateSearchListings, clearSearchFilter } =
    useListingStore();
  const { setSearchLatLng } = useMapStore();

  const handleSearch = () => {
    const queryParams = qs.stringify({ keyword: value });
    setSearchListingKeyword(value);
    navigate(`/search?${queryParams}`);
  };

  const handleClickSearchLocation = (location) => {
    clearSearchFilter();
    setSearchLatLng(location.latitude, location.longitude);
    updateSearchListings("locationId", location.id);
    navigate(`/search?${location.name} - ${location.city}`);
  };

  const handleChangeQuery = (e) => {
    setKeyword(e.target.value);
  };

  const handleFocus = useMemo(() => {
    setIsFocus(true);
  }, []);

  const handleBlur = useMemo(() => {
    setIsFocus(false);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await getLocations(1, 10, value);
      setSearchLocation(data?.contents);
    })();
  }, [value]);

  const items = useMemo(
    () =>
      searchLocation?.map((item) => ({
        label: (
          <div className="flex gap-2 items-center cursor-pointer hover:bg-slate-100 p-2">
            <CiLocationOn size={22} />
            {`${item.name} - ${item.city}`}
          </div>
        ),
        value: item.id,
        native: item,
      })),
    [searchLocation]
  );

  return (
    <AutoComplete
      popupMatchSelectWidth={400}
      style={{
        width: "100%",
      }}
      options={items}
      onSelect={(_, item) => handleClickSearchLocation(item.native)}
      onSearch={handleChangeQuery}
      size="large"
    >
      <div className="flex bg-white items-center gap-4 group rounded-[999px]  overflow-hidden h-10 pl-4 w-full border">
        <input
          className="bg-transparent h-full w-full  focus-within:outline-none text-base group-focus:border"
          onChange={handleChangeQuery}
          placeholder="Tìm kiếm địa chỉ, khu vực..."
        />
        <AnimatePresence>
          <motion.div
            initial={{ width: "40px" }}
            animate={{ width: isFocus ? "140px" : "40px" }}
            transition={{ duration: 0.3 }}
          >
            <Button
              type="primary"
              onMouseEnter={handleFocus}
              onMouseLeave={handleBlur}
              className={cn(
                "rounded-full h-full p-2 w-full flex overflow-hidden gap-2 items-center"
              )}
              onClick={handleSearch}
            >
              <CiSearch size={18} strokeWidth={1} />
              {isFocus && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-medium"
                >
                  Search
                </motion.span>
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </AutoComplete>
  );
};

export default Index;

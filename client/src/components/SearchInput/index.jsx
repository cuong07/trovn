import { AutoComplete } from "antd";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
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
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword] = useDebounce(keyword, 500);
    const { locations } = useLocationStore();
    const [searchLocation, setSearchLocation] = useState(locations);
    const navigate = useNavigate();
    const { setSearchListingKeyword, updateSearchListings, clearSearchFilter } =
        useListingStore();
    const { setSearchLatLng } = useMapStore();

    const handleSearch = () => {
        const queryParams = qs.stringify({ keyword: debouncedKeyword });
        setSearchListingKeyword(debouncedKeyword);
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

    useEffect(() => {
        if (debouncedKeyword) {
            const fetchLocations = async () => {
                const { data } = await getLocations(1, 10, debouncedKeyword);
                setSearchLocation(data?.contents);
            };
            fetchLocations();
        } else {
            setSearchLocation(locations);
        }
    }, [debouncedKeyword, locations]);

    const items = searchLocation?.map((item) => ({
        label: (
            <div className="flex gap-2 items-center cursor-pointer hover:bg-slate-100 p-2">
                <CiLocationOn size={22} />
                {`${item.name} - ${item.city}`}
            </div>
        ),
        value: item.id,
        native: item,
    }));

    return (
        <AutoComplete
            options={items}
            className="w-full"
            onSelect={(_, item) => handleClickSearchLocation(item.native)}
            onSearch={handleChangeQuery}
            size="middle"
        >
            <div className="flex bg-white items-center gap-4 group rounded-[999px] overflow-hidden h-10 pl-4 w-full border">
                <input
                    className="bg-transparent h-full w-full focus-within:outline-none text-base group-focus:border"
                    onChange={handleChangeQuery}
                    placeholder="Tìm kiếm địa chỉ, khu vực..."
                />
                <AnimatePresence>
                    <motion.div className="md:w-[140px] w-auto">
                        <Button
                            type="primary"
                            className={cn(
                                "md:w-[100px] rounded-full h-full p-2 flex overflow-hidden gap-2 items-center"
                            )}
                            onClick={handleSearch}
                        >
                            <CiSearch size={18} strokeWidth={1} />
                            <div className="md:block hidden">Tìm kiếm</div>
                        </Button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </AutoComplete>
    );
};

export default Index;

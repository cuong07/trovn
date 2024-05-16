import { Empty, Input, Popover } from "antd";
import { CiSearch } from "react-icons/ci";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import qs from "query-string";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

import { Button } from "..";
import { cn } from "../../utils/helpers";
import useListingStore from "../../hooks/useListingStore";

const Index = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 300);
  const navigate = useNavigate();
  const { setListingKeyword } = useListingStore();

  const handleSearch = () => {
    const queryParams = qs.stringify({ keyword: value });
    setListingKeyword(keyword);
    navigate(`/search?${queryParams}`);
  };

  const handleChangeQuery = (e) => {
    setKeyword(e.target.value);
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const content = (
    <div className="w-[280px]">
      <Empty />
    </div>
  );

  return (
    <Popover title="Danh sách tìm kiếm" content={content}>
      <div className="flex bg-white items-center gap-4 group rounded-[999px]  overflow-hidden h-10 pl-4 w-[300px] border">
        <input
          className="bg-transparent h-full w-full  focus-within:outline-none text-base group-focus:border"
          onFocus={handleFocus}
          onBlur={handleBlur}
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
    </Popover>
  );
};

export default Index;

import { Empty, Input, Popover } from "antd";
import { CiSearch } from "react-icons/ci";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "..";
import { cn } from "../../utils/helpers";

const Index = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [arrow, setArrow] = useState("Hide");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

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
  const text = <span>Title</span>;

  return (
    <Popover title="Danh sách tìm kiếm" arrow={mergedArrow} content={content}>
      <div className="flex bg-white items-center gap-4 group rounded-[999px]  overflow-hidden h-10 pl-4 w-[300px] border">
        <input
          className="bg-transparent h-full w-full  focus-within:outline-none text-base group-focus:border"
          onFocus={handleFocus}
          onBlur={handleBlur}
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
              onClick={() => setIsFocus(!isFocus)}
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

import { Upload, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import useListingStore from "../../hooks/useListingStore";
import { convertArrayToFiles } from "../../utils/helpers";

const Index = () => {
  const { updateListing, newListing } = useListingStore();
  const [showError, setShowError] = useState(false);

  const props = {
    name: "file",
    multiple: true,
    maxCount: 10,
    beforeUpload: () => {
      return false;
    },
    onChange(info) {
      const fileList = info.fileList;

      if (fileList.length < 5) {
        if (!showError) {
          setShowError(true);
          message.error("Phải thêm nhiều hơn hoặc bằng 5 ảnh");
        }
        return;
      }
      setShowError(false);
      const listFiles = fileList.map((item) => item.originFileObj);
      updateListing("files", convertArrayToFiles(listFiles));
    },
    onDrop(e) {
      const files = e.dataTransfer.files;

      if (files.length < 5) {
        message.error("Phải thêm nhiều hơn hoặc bằng 5 ảnh");
        return;
      }

      updateListing("files", files);
    },
  };

  useEffect(() => {
    console.log(newListing);
  }, [newListing]);

  return (
    <div className="">
      <Dragger {...props} className="h-full">
        <div className="grid justify-center ">
          <FaBoxOpen size={60} color="#1677FF" />
        </div>
        <p className="ant-upload-text">
          Nhấp hoặc kéo tệp vào khu vực này để tải lên
        </p>
        <p className="ant-upload-hint">
          Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên dữ liệu công
          ty hoặc các tập tin bị cấm khác.
        </p>
      </Dragger>
    </div>
  );
};

export default Index;

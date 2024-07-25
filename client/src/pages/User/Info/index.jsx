import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getListingByUserId,
  getUser,
  updateUser,
  updateUserAvatar,
} from "@/apis/user";
import { BiCamera, BiCheck, BiCheckShield, BiX } from "react-icons/bi";
import { ROLE } from "@/constants/role";
import { Button, message, Modal, Tooltip, Upload } from "antd";
import { FaAddressCard } from "react-icons/fa";
import { TbAddressBookOff } from "react-icons/tb";
import { LuLocate } from "react-icons/lu";
import { getLocationByLatLng } from "@/apis/location";
import useUserStore from "@/hooks/useUserStore";
import { createReport } from "@/apis/report";
import ImgCrop from "antd-img-crop";
import { AiOutlineWarning } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import ProductList from "@/pages/Home/ProductList";

const Index = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [userLocation, setUserLocation] = useState("");
  const currentUser = useUserStore().user;
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [fileImage, setFileImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [reportContent, setReportContent] = useState("");

  useEffect(() => {
    (async () => {
      const [res1, res2, res3] = await Promise.all([
        getUser(id),
        getListingByUserId(id),
      ]);
      console.log(res3);
      setUser(res1);
      setListings(res2.data?.contents);
      // setUserLocation(res3);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    (async () => {
      const data = await getLocationByLatLng(user?.latitude, user?.longitude);
      setUserLocation(data.display_name);
    })();
  }, [user]);

  const handleOk = async () => {
    try {
      if (fileImage) {
        setLoading(true);
        const { data, success } = await updateUserAvatar(fileImage);
        if (success) {
          message.success("Cập nhật thành công");
          setIsModalOpen(false);
          setUser(data);
        }
        setLoading(false);
      } else {
        message.warning("Vui lòng chọn hình");
      }
    } catch (error) {
      setLoading(false);

      message.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (file) => {
    setFileImage(file.file);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleUpdateDescription = async () => {
    try {
      const { success, data } = await updateUser({ description });
      if (success) {
        message.success("Thành công");
        setUser(data);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };

  const handleReport = async () => {
    try {
      if (!reportContent.length) {
        message.info("Vui lòng nhập nội dung báo cáo!");
        return;
      }
      const report = {
        content: reportContent,
        reportedId: id,
      };
      const { success } = await createReport(report);
      if (success) {
        message.success("Gửi báo cáo thành công");
        setIsOpenReport(false);
        return;
      }
      message.error("Có lỗi khi gửi báo cáo vui lòng thư lại");
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  console.log("listings", listings);

  return (
    <div className="container md:px-40 px-10 md:mx-auto mt-5 grid md:grid-cols-3 grid-cols-1 md:space-x-10 ">
      <div className="col-span-1 relative">
        <div className="sticky top-20">
          <div className="md:w-[400px] shadow-lg rounded-2xl p-4 flex flex-col gap-8 items-center">
            <div className=" w-40 h-40   relative ">
              <img
                src={user?.avatarUrl}
                className="object-cover  border rounded-full w-full h-full  "
                alt="avatar"
              />

              {currentUser?.id === id && (
                <div className="absolute z-50 bottom-0 translate-y-[50%] left-0 flex justify-center w-full">
                  <div className="w-[70%] border cursor-pointer py-1 bg-white rounded-full shadow-xl flex justify-center gap-2">
                    <BiCamera size={20} />
                    <p onClick={() => setIsModalOpen(true)}>Chỉnh sửa</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              {user?.isVerify && (
                <div className="flex gap-2 items-center text-lg">
                  <BiCheck size={24} />
                  Đã xác minh
                </div>
              )}
              {!user?.isVerify && (
                <div className="flex gap-2 items-center text-lg">
                  <BiX size={24} />
                  Chưa xác minh
                </div>
              )}
            </div>
          </div>
          {currentUser?.id !== id && (
            <span
              onClick={() => setIsOpenReport(true)}
              className="underline font-semibold text-xs my-4 items-center cursor-pointer justify-center flex ml-3 "
            >
              <AiOutlineWarning className="mr-1 my-auto" />
              Khiếu nại người dùng
            </span>
          )}
        </div>
      </div>
      <div className="md:col-span-2 col-span-1 mt-2 flex flex-col  md:gap-8">
        <div>
          <h2 className="text-3xl mb-4 font-semibold flex items-center gap-2">
            {user?.fullName || user?.username}
            <Tooltip arrow title="Người quản trị">
              {user?.role === ROLE.ADMIN && (
                <BiCheckShield size={26} color="#0866FF" />
              )}
            </Tooltip>
          </h2>
          <div className="mt-2 flex flex-col gap-2 ">
            <div className=" leading-6 text-base">
              {user?.description || "No bio yet"}
            </div>
            {currentUser?.id === id && (
              <Button
                className="text-xs font-semibold w-fit"
                onClick={() => setIsEdit(true)}
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
          <div className="flex gap-2 font-medium items-center  mt-4">
            <IoLocationSharp size={24} strokeWidth={2} />
            {userLocation}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-8 ">
            Mục cho thuê của {user?.fullName || user?.username}
          </h2>
          <ProductList data={listings} column={2} />
        </div>
      </div>
      <Modal
        visible={isModalOpen}
        title="Cập nhật hình đại diện"
        mask
        onOk={handleOk}
        okText="Xác nhận"
        cancelText="Thoát"
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <ImgCrop
          rotationSlider
          cropShape="round"
          fillColor="#ccc"
          zoomSlider
          showReset
          showGrid
          modalTitle="Chỉnh sửa hình ảnh"
          modalOk="Xác nhận"
          modalCancel="Thoát"
        >
          <Upload
            listType="picture-circle"
            onChange={onChange}
            onPreview={onPreview}
            multiple={false}
            beforeUpload={() => {
              return false;
            }}
          >
            Tải lên
          </Upload>
        </ImgCrop>
      </Modal>
      <Modal
        visible={isEdit}
        // title="Cập nhật hình đại diện"
        okText="Xác nhận"
        cancelText="Thoát"
        mask
        onOk={handleUpdateDescription}
        onCancel={() => setIsEdit(false)}
      >
        <div className="mt-4">
          <div className="font-semibold text-2xl">Giới thiệu về bạn</div>
          <p className="mt-2 text-[#717171] leading-4">
            Hãy chia sẻ đôi chút về bản thân để các Chủ nhà/Người tổ chức hoặc
            khách sau này có thể biết thêm về bạn.
          </p>
        </div>
        <textarea
          name=""
          id=""
          className="w-full p-2 border rounded-lg mt-4"
          rows="6"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </Modal>
      <Modal
        visible={isOpenReport}
        okText="Xác nhận"
        cancelText="Thoát"
        mask
        onOk={handleReport}
        onCancel={() => setIsOpenReport(false)}
      >
        <div className="mt-4">
          <div className="font-semibold text-2xl">Có chuyện gì vậy?</div>
          <p className="mt-2 text-[#717171] leading-4">
            Thông tin này sẽ chỉ được chia sẻ với TroVN
          </p>
        </div>
        <textarea
          name=""
          id=""
          className="w-full p-2 border rounded-lg mt-4"
          rows="6"
          onChange={(e) => setReportContent(e.target.value)}
          value={reportContent}
        ></textarea>
      </Modal>
    </div>
  );
};

export default Index;

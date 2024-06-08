import { getUser, getListingByUserId, getFavoriteListing } from "@/apis/user";
import { useEffect, useState } from "react";
import { Button } from "@/components";
import useUserStore from "@/hooks/userStore";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import InfoTab from "./info.tab";
import ProductList from "../Home/ProductList";
import {
  AiFillMessage,
  AiOutlineSend,
  AiFillPhone,
  AiOutlineWarning,
  AiOutlineEnvironment,
} from "react-icons/ai";

function Info() {
  const { id } = useParams();
  const [listings, setListing] = useState([]);
  const [favoriteListing, setFavoriteListing] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const getInforUser = async () => {
      const u = await getUser(id);
      console.log("UUUUUU!!!!!!: ", u);
      setUser((pre) => ({ ...u }));

      const lts = await getListingByUserId(id);
      const fvlts = await getFavoriteListing(id);
      setListing((prev) => [...lts]);
      setFavoriteListing((prev) => [...fvlts]);
    };
    getInforUser();
  }, [id]);

  // tabs
  const onChangeTabs = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Chung",
      children: <InfoTab user={user} />,
    },
    {
      key: "2",
      label: "Yêu thích",
      children: <ProductList data={favoriteListing} column={2} />,
    },
    {
      key: "3",
      label: "Phòng hiện có",
      children: <ProductList data={listings} column={2} />,
    },
  ];

  return (
    <>
      <div className="bg-slate-200 pt-5 pb-20">
        <div className="max-w-[1280px] mx-auto px-10 bg-white pb-3">
          <h1 className="text-2xl font-medium pt-3">Hồ sơ của tôi</h1>
          <h5 className="text-lg ">
            Quản lý thông tin hồ sơ để bảo mật tài khoảnn
          </h5>
          <hr className="my-5 border-black " />
          {/* left side */}
          <div className="flex ">
            <div className="w-4/12 flex justify-start flex-col">
              <div className="w-2/3 mx-auto">
                <img
                  className="mb-3 max-w-200"
                  src={user?.avatarUrl}
                  alt="Ảnh đại diện"
                />
                <Button>Chọn ảnh</Button>
              </div>
              <div className="mx-16">
                <div className="border-t-2 mt-10 relative">
                  <span className="absolute -top-3 bg-white pr-2 text-slate-400">
                    Tổng quan
                  </span>
                  <p className="my-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam itaque, molestias dolorem et cum pariatur dolore
                    expedita ipsam. Neque recusandae itaque nemo aliquam?
                    Cupiditate officia officiis distinctio, eius similique
                    consequatur.
                  </p>
                </div>
                <div className="border-t-2 mt-10 relative">
                  <span className="absolute -top-3 bg-white pr-2 text-slate-400">
                    Thẻ
                  </span>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="w-8/12 mr-5">
              <div
                className="flex flex-col justify-between"
                style={{ height: "180px" }}
              >
                <div>
                  <div className="flex">
                    <span className="text-3xl font-bold">{user.username}</span>
                    <span className="flex items-center ml-10 pt-2 text-slate-500">
                      <AiOutlineEnvironment className="mr-1" />
                      {user.address}
                    </span>
                  </div>

                  <span className="text-xs ">Vai trò:</span>
                  <span className="text-xs text-cyan-400">{user.role}</span>
                  {user.role === "HOST" ? (
                    <span>{user.isPremium ? "- Normal" : "isPremium"}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p className="text-xs">Xếp loại người dùng</p>
                  <p className="text-cyan-600 text-base">Normal</p>
                </div>
                <div className="flex">
                  <span className="flex text-base hover:text-sky-600 mr-3 cursor-default">
                    <AiFillMessage className="mr-1 my-auto" /> Gửi tin nhắn
                  </span>
                  <span className="flex text-base hover:text-sky-600 mx-3 cursor-default">
                    <AiOutlineSend className="mr-1 my-auto" />
                    Zalo
                  </span>
                  <span className="flex text-base hover:text-sky-600 mx-3 cursor-default">
                    <AiFillPhone className="mr-1 my-auto" />
                    Liên hệ qua SĐT
                  </span>
                  <span className="hover:text-red-700 text-base flex ml-3 cursor-default">
                    <AiOutlineWarning className="mr-1 my-auto" /> Báo xấu
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <Tabs
                  defaultActiveKey="1"
                  items={items}
                  onChange={onChangeTabs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;

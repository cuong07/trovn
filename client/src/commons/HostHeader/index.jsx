import { Link } from "react-router-dom";
import { LogoSvg } from "../../components/Icons";
import { IoBanOutline, IoSettings } from "react-icons/io5";
import { FaAppStore, FaUser } from "react-icons/fa";
import { CiHeart, CiMail, CiUser } from "react-icons/ci";
import { Avatar, Flex, Menu, Popover } from "antd";
import { useState } from "react";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
const Index = () => {
  const items = [
    {
      label: "Phòng cho thuê",
      key: "1",
      icon: <CiMail />,
      children: [
        { key: "1.1", label: <Link to="listing/list">Danh sách</Link> },
        { key: "1.2", label: <Link to="listing/create">Thêm</Link> },
      ],
    },
    {
      key: 2,
      label: "Quảng bá",
      icon: <RiAdvertisementLine />,
      children: [
        { key: 2.1, label: <Link to="ads-package">Gói quảng bá</Link> },
      ],
    },
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const contents = (
    <div className="flex flex-col gap-2 p-2 ">
      <Link to="/user/info" className="flex gap-2 items-center">
        <div>
          <FaUser />
        </div>
        Thông tin cá nhân
      </Link>
    </div>
  );

  return (
    <div className="h-full leading-none flex items-center justify-between container mx-auto">
      <Flex align="center" gap={36}>
        <div className="font-bold text-2xl tracking-wider">
          <Link to="/">
            <LogoSvg
              style={{
                width: 60,
                height: 60,
              }}
            />
          </Link>
        </div>
      </Flex>
      <div className="">
        <Menu
          className="bg-transparent h-full  text-center bottom-0"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <Flex gap={24} align="center" justify="center">
        <div>
          <CiHeart size={24} />
        </div>
        <div>
          <IoIosNotificationsOutline size={24} />
        </div>
        <Popover placement="bottomRight" content={contents} arrow={false}>
          <Avatar size={32} icon={<CiUser />} />
        </Popover>
      </Flex>
    </div>
  );
};

export default Index;

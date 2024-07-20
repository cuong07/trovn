import { Link } from "react-router-dom";
import { LogoSvg } from "@/components/Icons";
import { Flex, Menu } from "antd";
import { useState } from "react";
import { TbPackages } from "react-icons/tb";
import useUserStore from "@/hooks/useUserStore";
import { BsHouseAdd, BsHouses } from "react-icons/bs";
import { UserMenu } from "@/components";
const Index = () => {
  const { user } = useUserStore();

  const items = [
    {
      key: 1,
      label: <Link to="listing/list">Danh sách phòng</Link>,
      icon: <BsHouses />,
    },
    {
      key: 2,
      label: <Link to="listing/create">Thêm phòng</Link>,
      icon: <BsHouseAdd />,
    },
    {
      key: 3,
      label: <Link to="ads-package">Gói quảng bá</Link>,
      icon: <TbPackages />,
    },
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="h-full leading-none flex items-center justify-between container mx-auto">
      <Flex align="center" gap={36}>
        <div className="font-bold text-2xl tracking-wider">
          <Link to="/">
            <LogoSvg
              style={{
                width: 80,
                height: 80,
              }}
            />
          </Link>
        </div>
      </Flex>
      <div className="w-[450px]">
        <Menu
          className="bg-transparent h-full  text-center bottom-0"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <Flex gap={24} align="center" justify="center">
        <div className="text-base flex gap-2">
          Hi!
          <h2 className="font-semibold">{user?.fullName || user?.username}</h2>
        </div>
        <UserMenu />
      </Flex>
    </div>
  );
};

export default Index;

import React from "react";
import { BiBell, BiHeart, BiHome, BiMessage, BiUser } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/helpers";
import { Flex } from "antd";

const Index = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const items = [
    {
      label: "Trang chủ",
      icon: <BiHome size={20} />,
      path: "",
    },
    {
      label: "Tin nhắn",
      icon: <BiMessage size={20} />,
      path: "/chat",
    },
    {
      label: "Thông báo",
      icon: <BiBell size={20} />,
      path: "/notification",
    },
    {
      label: "Yêu thích",
      icon: <BiHeart size={20} />,
      path: "/favorite",
    },
    {
      label: "Cá nhân",
      icon: <BiUser size={20} />,
      path: "/user/info",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 h-full">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-center flex-col"
        >
          <NavLink
            to={item.path}
            className={({ isActive, isPending }) =>
              isPending
                ? "hover:text-red-400"
                : isActive
                ? "text-red-400 hover:text-red-400"
                : "hover:text-red-400"
            }
          >
            <Flex align="center" justify="center" vertical gap={2}>
              <div>{item.icon}</div>
              <div className="text-xs">{item.label}</div>
            </Flex>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Index;

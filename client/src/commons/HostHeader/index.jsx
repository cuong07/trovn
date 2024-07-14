import { Link } from "react-router-dom";
import { LogoSvg } from "@/components/Icons";
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Avatar, Flex, Menu, Popover } from "antd";
import { useState } from "react";
import { TbPackages } from "react-icons/tb";
import useUserStore from "@/hooks/useUserStore";
import { BiLogOut } from "react-icons/bi";
import { BsHouseAdd, BsHouses } from "react-icons/bs";
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

    const contents = (
        <div className="flex flex-col gap-2 p-2 ">
            <Link
                to={`/user/info/${user?.id}`}
                className="flex gap-2 items-center"
            >
                <div>
                    <FaUser />
                </div>
                Thông tin cá nhân
            </Link>
            <Link to="/logout" className="flex gap-2 items-center">
                <div>
                    <BiLogOut />
                </div>
                Đăng xuất
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
                    <h2 className="font-semibold">{user?.username}</h2>
                </div>
                <Popover
                    placement="bottomRight"
                    content={contents}
                    arrow={false}
                >
                    <Avatar size={32} icon={<CiUser />} src={user?.avatarUrl} />
                </Popover>
            </Flex>
        </div>
    );
};

export default Index;

import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

import { LogoSvg } from "@/components/Icons";
import { IoLocationSharp } from "react-icons/io5";
import {
    HiOutlineFire,
    HiOutlineQueueList,
    HiOutlineSquares2X2,
    HiOutlineTicket,
    HiOutlineUserGroup,
    HiOutlineWallet,
} from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/apis/user";
import useUserStore from "@/hooks/useUserStore";
import { GoReport } from "react-icons/go";
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { user } = useUserStore();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [
        {
            key: "1",
            icon: <HiOutlineSquares2X2 size={20} />,
            label: "Dashboard",
            onClick: () => {
                navigate("");
            },
        },
        {
            key: "2",
            icon: <HiOutlineQueueList size={20} />,
            label: "Listings",
            onClick: () => {
                navigate("listings");
            },
        },
        {
            key: "3",
            icon: <HiOutlineTicket size={20} />,
            label: "Banners",
            onClick: () => {
                navigate("banners");
            },
        },
        {
            key: "4",
            icon: <IoLocationSharp size={20} />,
            label: "Locations",
            onClick: () => {
                navigate("locations");
            },
        },
        {
            key: "5",
            icon: <HiOutlineFire size={20} />,
            label: "Amenities",
            onClick: () => {
                navigate("amenities");
            },
        },
        {
            key: "6",
            icon: <HiOutlineUserGroup size={20} />,
            label: "Users",
            onClick: () => {
                navigate("users");
            },
        },
        {
            key: "7",
            icon: <HiOutlineWallet size={20} />,
            label: "Payments",
            onClick: () => {
                navigate("payments");
            },
        },
        {
            key: "8",
            icon: <LuMessagesSquare size={20} />,
            label: "Messages",
            onClick: () => {
                navigate("chat");
            },
        },
        {
            key: "9",
            icon: <GoReport size={20} />,
            label: "Reports",
            onClick: () => {
                navigate("reports");
            },
        },
    ];

    useEffect(() => {
        (async () => {
            await getCurrentUser();
        })();
    }, []);

    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div>
                    <Link to="/">
                        <div className="text-white text-center font-semibold text-2xl uppercase h-16 flex items-center justify-center overflow-hidden ">
                            {collapsed ? <LogoSvg /> : "Admin Panel"}
                        </div>
                    </Link>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={items}
                    />
                </div>
                <div>
                    {/* <Menu.Item
                        icon={<BiLogOut />}
                        label="Đăng xuất"
                        key="Đăng xuất"
                        prefixCls="w-full"
                    /> */}
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className="flex justify-between"
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="mr-8 text-xl flex gap-2 items-center">
                        Hi!
                        <strong className="">
                            {user?.fullName || user?.username}
                        </strong>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        flex: 1,
                        overflow: "scroll",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;

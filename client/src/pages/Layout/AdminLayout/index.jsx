import React, { useEffect, useState } from "react";
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
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/apis/user";
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
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
    ];

    useEffect(() => {
        (async () => {
            await getCurrentUser();
        })();
    }, []);

    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="text-white text-center font-semibold text-2xl uppercase h-16 flex items-center justify-center overflow-hidden ">
                    {collapsed ? <LogoSvg /> : "Admin Panel"}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
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
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        flex: 1,
                        // overflow: "scroll",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;

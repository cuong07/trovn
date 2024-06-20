import React from "react";
import { Layout } from "antd";
import {
    TwitterOutlined,
    FacebookOutlined,
    InstagramOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/helpers";

const { Footer } = Layout;
const CustomFooter = () => {
    const { pathname } = useLocation();
    return (
        <>
            <div
                className={cn(
                    "container mx-auto",
                    pathname.includes("/search") ||
                        (pathname.includes("message") && "hidden")
                )}
            >
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 py-20 mb-8">
                    <div className="grid justify-center">
                        <h3 className="text-lg font-bold mb-2">Hỗ trợ</h3>
                        <ul>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Trung tâm trợ giúp
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Các tùy chọn hủy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Báo cáo lo ngại của khu dân cư
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid justify-center">
                        <h3 className="text-lg font-bold mb-2">
                            Đón tiếp khách
                        </h3>
                        <ul>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Cho thuê nhà
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Trang cho chủ nhà
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Diễn đàn cộng đồng
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Tài nguyên về đón tiếp khách
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Đón tiếp khách có trách nhiệm
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid justify-center">
                        <h3 className="text-lg font-bold mb-2">Về chúng tôi</h3>
                        <ul>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Trang tin tức
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Tính năng mới
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Nhà đầu tư
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <div>© 2024 Trovn, Inc</div>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            <FacebookOutlined style={{ fontSize: "24px" }} />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            <InstagramOutlined style={{ fontSize: "24px" }} />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            <TwitterOutlined style={{ fontSize: "24px" }} />
                        </a>
                    </div>
                </div>
            </div>
            {pathname.includes("/search") && (
                <div className="flex justify-between h-10 py-4 items-center px-10 items-center text-gray-600">
                    <div>© 2024 Trovn, Inc</div>
                    <div className="flex space-x-4">
                        <Link href="#" aria-label="Facebook">
                            <FacebookOutlined className="text-xl text-black" />
                        </Link>
                        <Link href="#" aria-label="Instagram">
                            <InstagramOutlined className="text-xl text-black" />
                        </Link>
                        <Link href="#" aria-label="Twitter">
                            <TwitterOutlined className="text-xl text-black" />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomFooter;

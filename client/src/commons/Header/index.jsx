import {
    Avatar,
    Flex,
    Input,
    Modal,
    Popover,
    Tooltip,
    message,
    notification,
} from "antd";
import { Button, SearchInput } from "@/components";
import { CiUser } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LogoSvg } from "@/components/Icons";
import useUserStore from "@/hooks/userStore";
import { useEffect, useState } from "react";
import { getEmailOtp, getVerifyEmailOtp } from "@/apis/user";
import { ROLE } from "@/constants/role";
import { FiBell, FiHeart, FiLogIn, FiMessageCircle } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import useConversationStore from "@/hooks/useConversationStore";
import { FcSettings } from "react-icons/fc";
import { BiMenu } from "react-icons/bi";

const Index = () => {
    const naviagate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { unreadMessagesCount, setUnreadMessagesCount } =
        useConversationStore();
    const navigate = useNavigate();
    // * Custom hooks
    const { user, otp, setOtp, socketConnection } = useUserStore();

    const contents = (
        <div className="flex flex-col p-2 md:w-[300px] text-lg  ">
            {user && (
                <>
                    <Link
                        to={`/user/info/${user?.id}`}
                        className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                    >
                        <div>
                            <FaUser />
                        </div>
                        Thông tin cá nhân
                    </Link>
                    <Link
                        to={`/account-settings`}
                        className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                    >
                        <div>
                            <FcSettings />
                        </div>
                        Tài khoản
                    </Link>
                    <hr />
                    <div className="text-[#717171]">
                        {user?.role === ROLE.ADMIN && (
                            <Link
                                to="/admin"
                                className="flex gap-2 items-center p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                            >
                                <div>
                                    <RiAdminLine />
                                </div>
                                Trang quản lý
                            </Link>
                        )}
                        <Link
                            to="/logout"
                            className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                        >
                            <div>
                                <IoLogOutOutline />
                            </div>
                            Đăng xuất
                        </Link>
                    </div>
                </>
            )}
            {!user && (
                <>
                    <Link
                        to="/login"
                        className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                    >
                        <div>
                            <FiLogIn />
                        </div>
                        Đăng ký / Đăng nhập
                    </Link>
                </>
            )}
        </div>
    );

    const handleClickHosting = () => {
        const placement = "topLeft";
        if (!user) {
            return api.info({
                btn: (
                    <Button>
                        <Link to="/login">Đăng nhập</Link>
                    </Button>
                ),
                role: "alert",
                message: "Vui lòng đăng nhập để tiếp tục",
                description: "Đăng nhập để trở thành chủ nhà",
                placement,
            });
        }

        if (user.isVerify) {
            naviagate("/host");
        }

        if (!user.isVerify) {
            setIsOpen(true);
        }
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            const { success } = await getVerifyEmailOtp();
            if (success) {
                message.success("Xác minh thành công");
                setConfirmLoading(false);
                naviagate("/host");
                return;
            }
            setConfirmLoading(false);
            message.error("Mã OTP không chính xác");
        } catch (error) {
            setConfirmLoading(false);
            console.log(error);
            message.error("Mã OTP không chính xác");
        }
    };

    const handleSendEmailOtp = async () => {
        try {
            const { data, success } = await getEmailOtp();
            if (success) {
                message.success("Đã gửi mail thành công");
                return;
            }
            message.error("Gửi mail thât bại");
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    };

    // useEffect(() => {
    //     if (!socketConnection) {
    //         return;
    //     }
    //     if (user && user.id) {
    //         socketConnection.emit("unreadMessagesCount", user.id);
    //     }

    //     socketConnection.on("unreadMessagesCount", (count) => {
    //         console.log("Unread messages:", count);
    //         setUnreadMessagesCount(count);
    //     });
    // }, [setUnreadMessagesCount, socketConnection, user]);

    const handleNavigate = (url) => {
        navigate(url);
    };

    return (
        <>
            {contextHolder}
            <div className="h-full leading-none flex items-center justify-between container mx-auto md:px-0 px-4">
                <div className="flex md:gap-9 gap-2 items-center">
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
                    <div className="md:w-[400px] md:block hidden ">
                        <SearchInput />
                    </div>
                </div>
                <div className=" md:hidden block w-[300px] ">
                    <SearchInput />
                </div>
                <Flex gap={24} align="center" justify="center">
                    <Button
                        type="primary"
                        className="rounded-full h-9 md:block hidden "
                        onClick={handleClickHosting}
                    >
                        Trở thành chủ nhà
                    </Button>
                    <Flex
                        gap={24}
                        align="center"
                        justify="center"
                        className="md:flex hidden"
                    >
                        <Tooltip placement="bottom" title="Danh sách yêu thích">
                            <FiHeart
                                size={20}
                                className="cursor-pointer"
                                onClick={() => handleNavigate("favorite")}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="Trò chuyện">
                            <div className="relative">
                                <FiMessageCircle
                                    size={20}
                                    className="cursor-pointer"
                                    onClick={() => handleNavigate("chat")}
                                />
                                {unreadMessagesCount > 0 && (
                                    <div className="absolute -top-2 bg-red-600 w-4 h-4 flex items-center justify-center text-white font-semibold -right-2 text-[10px] rounded-full">
                                        {unreadMessagesCount}
                                    </div>
                                )}
                            </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Thông báo">
                            <FiBell
                                size={20}
                                className="cursor-pointer"
                                onClick={() => handleNavigate("notification")}
                            />
                        </Tooltip>
                    </Flex>
                    <Popover
                        placement="bottomRight"
                        content={contents}
                        arrow={false}
                    >
                        <div className="flex gap-1 py-1 px-2 border rounded-3xl items-center">
                            <BiMenu size={20} />
                            <Avatar
                                size={32}
                                src={user?.avatarUrl}
                                icon={<CiUser />}
                            />
                        </div>
                    </Popover>
                </Flex>
            </div>
            <Modal
                open={isOpen}
                width={600}
                title={
                    <div className="text-xl">
                        Vui lòng xác minh email trước khi đăng bài
                    </div>
                }
                onCancel={onClose}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                closable
            >
                <div className="grid gap-2">
                    <label className="font-semibold text-lg">OTP</label>
                    <Input.OTP
                        size="large"
                        length={6}
                        value={otp}
                        onChange={(val) => setOtp(val)}
                    />
                </div>
                <div className="mt-1">
                    Gửi mã về email của bạn <strong>{user?.email}</strong>{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={handleSendEmailOtp}
                    >
                        gửi mã
                    </span>
                </div>
            </Modal>
        </>
    );
};

export default Index;

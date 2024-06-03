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
import { useState } from "react";
import { getEmailOtp, getVerifyEmailOtp } from "@/apis/user";
import { ROLE } from "@/constants/role";
import { FiBell, FiHeart, FiLogIn, FiMessageCircle } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";

const Index = () => {
    const naviagate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    // * Custom hooks
    const { user, otp, setOtp } = useUserStore();

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
            {user?.role === ROLE.ADMIN && (
                <Link to="/admin" className="flex gap-2 items-center">
                    <div>
                        <RiAdminLine />
                    </div>
                    Trang quản lý
                </Link>
            )}
            {user && (
                <Link to="/logout" className="flex gap-2 items-center">
                    <div>
                        <IoLogOutOutline />
                    </div>
                    Đăng xuất
                </Link>
            )}
            {!user && (
                <>
                    <Link to="/login" className="flex gap-2 items-center">
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
                            <FiMessageCircle
                                size={20}
                                className="cursor-pointer"
                                onClick={() => handleNavigate("chat")}
                            />
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
                        <Avatar
                            size={32}
                            src={user?.avatarUrl}
                            icon={<CiUser />}
                        />
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

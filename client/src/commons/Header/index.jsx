import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { Flex, Input, Modal, Tooltip, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchInput, UserMenu } from "@/components";
import { getEmailOtp, getVerifyEmailOtp } from "@/apis/user";

import { Button } from "@/components/ui/button";
import { LogoSvg } from "@/components/Icons";
import { toast } from "sonner";
import useConversationStore from "@/hooks/useConversationStore";
import { useModal } from "@/hooks/useModalStore";
import { useState } from "react";
import useUserStore from "@/hooks/useUserStore";

const Index = () => {
    const navigate = useNavigate();
    // const { toast } = useToast();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { unreadMessagesCount } = useConversationStore();

    const { onOpen } = useModal();

    const { user, otp, setOtp } = useUserStore();

    const handleClickHosting = () => {
        if (!user) {
            // console.log("!user is not logged in");
            return toast("Vui lòng đăng nhập", {
                description: "Đăng nhập để sử dụng tính năng náy!",
                action: {
                    label: "Đăng nhập",
                    onClick: () => navigate("/login"),
                },
            });
        }

        if (user.isVerify) {
            return navigate("/host");
        }

        if (!user.isVerify) {
            onAction("verifyCodeModal");
        }
    };

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            const { success } = await getVerifyEmailOtp();
            if (success) {
                navigate("/host");
                console.log("hót");

                toast("Xác minh thành công", {
                    description: "Xác minh tài khoản thành công!",
                });
                setConfirmLoading(false);
                return;
            }
            setConfirmLoading(false);
            toast("Xác minh không thành công", {
                description: "Xác minh tài khoản không thành công!",
            });
        } catch (error) {
            setConfirmLoading(false);
            console.log(error);
            toast("Xác minh không thành công", {
                description: "Xác minh tài khoản không thành công!",
            });
        }
    };

    const handleSendEmailOtp = async () => {
        try {
            const { success } = await getEmailOtp();
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

    const onAction = (action) => {
        // e.stopPropagation();
        onOpen(action, { handleSendEmailOtp, user, handleOk });
    };

    return (
        <>
            <div className="h-full leading-none flex items-center justify-between container mx-auto md:px-0 px-4">
                <div className="flex md:gap-9 gap-2 items-center">
                    <div className="font-bold text-2xl tracking-wider">
                        <Link to="/">
                            <LogoSvg className="md:size-20 size-16" />
                        </Link>
                    </div>
                    <div className="md:w-[400px] md:block hidden ">
                        <SearchInput />
                    </div>
                </div>
                <div className=" md:hidden block w-[300px] ">
                    <SearchInput />
                </div>
                <div className="flex items-center justify-center gap-6">
                    <Button variant="outline" onClick={handleClickHosting}>
                        Trở thành chủ nhà
                    </Button>
                    <div className="md:flex hidden gap-6 justify-center items-center">
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
                    </div>
                    <UserMenu />
                </div>
            </div>
        </>
    );
};

export default Index;

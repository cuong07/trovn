import { Flex, Input, Modal, Tooltip, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiBell, FiHeart, FiMessageCircle } from "react-icons/fi";

import { LogoSvg } from "@/components/Icons";
import { getEmailOtp, getVerifyEmailOtp } from "@/apis/user";
import useConversationStore from "@/hooks/useConversationStore";
import useUserStore from "@/hooks/useUserStore";
import { Button, SearchInput, UserMenu } from "@/components";

const Index = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { unreadMessagesCount } = useConversationStore();

  const { user, otp, setOtp } = useUserStore();

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
      navigate("/host");
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
        navigate("/host");
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

  return (
    <>
      {contextHolder}
      <div className="h-full leading-none flex items-center justify-between container mx-auto md:px-0 px-4">
        <div className="flex md:gap-9 gap-2 items-center">
          <div className="font-bold text-2xl tracking-wider">
            <Link to="/">
              <LogoSvg
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </Link>
            {/* <div></div> */}
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
            {/* <Tooltip placement="bottom" title="Thông báo">
              <FiBell
                size={20}
                className="cursor-pointer"
                onClick={() => handleNavigate("notification")}
              />
            </Tooltip> */}
          </Flex>
          <UserMenu />
        </Flex>
      </div>
      <Modal
        open={isOpen}
        width={600}
        onCancel={onClose}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        closable
      >
        <div className="text-2xl font-semibold my-8">
          Vui lòng xác minh email trước khi đăng bài
        </div>
        <div className="grid gap-2">
          <label className="font-semibold text-lg">OTP</label>
          <Input.OTP
            size="large"
            length={6}
            value={otp}
            onChange={(val) => setOtp(val)}
          />
        </div>
        <div className="mt-2">
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

import {
  Avatar,
  Flex,
  Input,
  Modal,
  Popover,
  message,
  notification,
} from "antd";
import { Button, SearchInput } from "../../components";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LogoSvg } from "../../components/Icons";
import useUserStore from "../../hooks/userStore";
import { useEffect, useState } from "react";
import { getEmailOtp, getVerifyEmailOtp } from "../../apis/user";
import { ROLE } from "../../constants/role";
import { RiAdminLine } from "react-icons/ri";

const Index = () => {
  const naviagate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user, otp, setOtp } = useUserStore();
  const [api, contextHolder] = notification.useNotification();

  const contents = (
    <div className="flex flex-col gap-2 p-2 ">
      <Link to="/user/info" className="flex gap-2 items-center">
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

  return (
    <>
      {contextHolder}
      <div className="h-full leading-none flex items-center justify-between container mx-auto">
        <div className="flex gap-9 items-center">
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
          <div>
            <SearchInput />
          </div>
        </div>
        <Flex gap={24} align="center" justify="center">
          <Button
            type="primary"
            className="rounded-full h-9"
            onClick={handleClickHosting}
          >
            Trở thành chủ nhà
          </Button>
          <div>
            <CiHeart size={24} />
          </div>
          <div>
            <IoIosNotificationsOutline size={24} />
          </div>
          <Popover placement="bottomRight" content={contents} arrow={false}>
            <Avatar size={32} icon={<CiUser />} />
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

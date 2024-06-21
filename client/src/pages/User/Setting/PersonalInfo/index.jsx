import useUserStore from "@/hooks/userStore";
import { Breadcrumb } from "antd";
import React, { useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import EditFullName from "./EditFullName";
import EditUsername from "./EditUserName";
import EditEmail from "./EditEmail";
import EditPhoneNumber from "./EditPhoneNumber";

const Index = () => {
    const { user } = useUserStore();

    const [edit, setSetEdit] = useState({
        isEditFullName: false,
        isEditUsername: false,
        isEditPhoneNumber: false,
        isEditEmail: false,
        isEditAddress: false,
    });

    const handleToggleSetEdit = (name) => {
        setSetEdit((prev) => ({
            isEditFullName: false,
            isEditUsername: false,
            isEditPhoneNumber: false,
            isEditEmail: false,
            isEditAddress: false,
            [name]: !prev[name],
        }));
    };

    return (
        <div className="container md:px-60 px-4 mx-auto mt-8">
            <Breadcrumb separator=">">
                <Breadcrumb.Item>Tài khoản</Breadcrumb.Item>
                <Breadcrumb.Item>Thông tin cá nhân</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-2">
                <h1 className="text-[32px] font-semibold leading-9">
                    Thông tin cá nhân
                </h1>
            </div>
            <div className="mt-10 grid grid-cols-3">
                <div className="col-span-2">
                    <div className="py-6 border-b">
                        <div className=" flex justify-between ">
                            <div>
                                <div className="text-base text-[#222]">
                                    Tên đầy đủ
                                </div>
                                {!edit.isEditFullName && (
                                    <div className="text-[#717171]">
                                        {user?.fullName || "Chưa được cung cấp"}
                                    </div>
                                )}
                                {edit.isEditFullName && (
                                    <div className="text-[#717171]">
                                        Tên của bạn sẽ hiển thị như trên cho Chủ
                                        nhà và khách.
                                    </div>
                                )}
                            </div>
                            <div
                                className="underline font-semibold text-xs cursor-pointer"
                                onClick={() =>
                                    handleToggleSetEdit("isEditFullName")
                                }
                            >
                                {edit.isEditFullName
                                    ? "Đóng"
                                    : user?.fullName
                                    ? "Chỉnh sửa"
                                    : "Thêm"}
                            </div>
                        </div>
                        {edit.isEditFullName && <EditFullName />}
                    </div>
                    <div className="py-6  border-b">
                        <div className="flex justify-between">
                            <div>
                                <div className="text-base text-[#222]">
                                    Tên đăng nhập
                                </div>
                                {!edit.isEditUsername && (
                                    <div className="text-[#717171]">
                                        {user?.username || "Chưa được cung cấp"}
                                    </div>
                                )}
                                {edit.isEditUsername && (
                                    <div className="text-[#717171]">
                                        Tên của bạn sẽ hiển thị như trên cho Chủ
                                        nhà và khách.
                                    </div>
                                )}
                            </div>
                            <div
                                className="underline font-semibold text-xs cursor-pointer"
                                onClick={() =>
                                    handleToggleSetEdit("isEditUsername")
                                }
                            >
                                {edit.isEditUsername
                                    ? "Đóng"
                                    : user?.username
                                    ? "Chỉnh sửa"
                                    : "Thêm"}
                            </div>
                        </div>
                        {edit.isEditUsername && <EditUsername />}
                    </div>
                    <div className="py-6 border-b">
                        <div className="flex justify-between ">
                            <div>
                                <div className="text-base text-[#222]">
                                    Địa chỉ email
                                </div>
                                {!edit.isEditEmail && (
                                    <div className="text-[#717171]">
                                        {user?.email || "Chưa được cung cấp"}
                                    </div>
                                )}
                                {edit.isEditEmail && (
                                    <div className="text-[#717171]">
                                        Sử dụng địa chỉ mà bạn luôn có quyền
                                        truy cập.
                                    </div>
                                )}
                            </div>
                            <div
                                className="underline font-semibold text-xs cursor-pointer"
                                onClick={() =>
                                    handleToggleSetEdit("isEditEmail")
                                }
                            >
                                {edit.isEditEmail
                                    ? "Đóng"
                                    : user?.email
                                    ? "Chỉnh sửa"
                                    : "Thêm"}
                            </div>
                        </div>
                        {edit.isEditEmail && <EditEmail />}
                    </div>
                    <div className="py-6  border-b">
                        <div className="flex justify-between">
                            <div>
                                <div className="text-base text-[#222]">
                                    Số điện thoại
                                </div>
                                {!edit.isEditPhoneNumber && (
                                    <div className="text-[#717171]">
                                        {user?.phoneNumber ||
                                            "Chưa được cung cấp"}
                                    </div>
                                )}
                                {edit.isEditPhoneNumber && (
                                    <div className="text-[#717171]">
                                        Thêm số điện thoại để khách đã xác nhận
                                        và <strong>trovn</strong> có thể liên hệ
                                        với bạn. Bạn có thể thêm các số điện
                                        thoại khác và chọn mục đích sử dụng
                                        tương ứng.
                                    </div>
                                )}
                            </div>
                            <div
                                className="underline font-semibold text-xs cursor-pointer"
                                onClick={() =>
                                    handleToggleSetEdit("isEditPhoneNumber")
                                }
                            >
                                {edit.isEditPhoneNumber
                                    ? "Đóng"
                                    : user?.phoneNumber
                                    ? "Chỉnh sửa"
                                    : "Thêm"}
                            </div>
                        </div>
                        {edit.isEditPhoneNumber && <EditPhoneNumber />}
                    </div>
                    <div className="py-6 flex justify-between border-b">
                        <div>
                            <div className="text-base text-[#222]">Địa chỉ</div>
                            <div className="text-[#717171]">
                                {user?.address || "Chưa được cung cấp"}
                            </div>
                        </div>
                        <div
                            className="underline font-semibold text-xs cursor-pointer"
                            onClick={() => handleToggleSetEdit("isEditAddress")}
                        >
                            {edit.isEditAddress
                                ? "Đóng"
                                : user?.address
                                ? "Chỉnh sửa"
                                : "Thêm"}
                        </div>
                    </div>
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>
    );
};

export default Index;

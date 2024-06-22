import useUserStore from "@/hooks/userStore";
import { Breadcrumb, message } from "antd";
import React, { useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import EditFullName from "./EditFullName";
import EditUsername from "./EditUserName";
import EditEmail from "./EditEmail";
import EditPhoneNumber from "./EditPhoneNumber";
import { updateUser } from "@/apis/user";

const Index = () => {
    const { user, setUser } = useUserStore();

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

    const onSubmit = async (value) => {
        try {
            const { success, data } = await updateUser(value);
            if (success) {
                message.success("Thành công");
                setUser(data);
            }
        } catch (error) {
            message.error(error.message);
            console.log(error);
        }
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
            <div className="mt-10 grid grid-cols-3 gap-8">
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
                        {edit.isEditFullName && (
                            <EditFullName onSubmit={onSubmit} />
                        )}
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
                        {edit.isEditUsername && (
                            <EditUsername onSubmit={onSubmit} />
                        )}
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
                        {edit.isEditEmail && <EditEmail onSubmit={onSubmit} />}
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
                        {edit.isEditPhoneNumber && (
                            <EditPhoneNumber onSubmit={onSubmit} />
                        )}
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
                <div className="col-span-1 ">
                    <div className=" border p-4 rounded-lg">
                        <svg
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: "block",
                                height: 48,
                                width: 48,
                                fill: "rgb(227, 28, 95)",
                                stroke: "currentcolor",
                            }}
                        >
                            <g>
                                <g stroke="none">
                                    <path
                                        d="M27 5l.585.005c4.29.076 8.837.984 13.645 2.737l.77.288V35.4l-.008.13a1 1 0 0 1-.47.724l-.116.06L27 42.716V25a1 1 0 0 0-.883-.993L26 24H12V8.029l.77-.286c4.797-1.75 9.336-2.658 13.62-2.737L27 5z"
                                        fill-opacity=".2"
                                    ></path>
                                    <path d="M27 1c5.599 0 11.518 1.275 17.755 3.816a2 2 0 0 1 1.239 1.691L46 6.67V35.4a5 5 0 0 1-2.764 4.472l-.205.097-15.594 6.93L27 47l-2.461-1h2.451a.01.01 0 0 0 .007-.003L27 45.99v-1.085l15.218-6.763a3 3 0 0 0 1.757-2.351l.019-.194.006-.196V6.669l-.692-.278C37.557 4.128 32.121 3 27 3S16.443 4.128 10.692 6.391L10 6.67 9.999 24H8V6.669a2 2 0 0 1 1.098-1.786l.147-.067C15.483 2.275 21.401 1 27 1z"></path>
                                </g>
                                <g fill="none" stroke-width="2">
                                    <path d="M4 24h22a1 1 0 0 1 1 1v20.99a.01.01 0 0 1-.01.01H4a1 1 0 0 1-1-1V25a1 1 0 0 1 1-1z"></path>
                                    <path d="M21 25v-5a6 6 0 1 0-12 0v5"></path>
                                    <circle cx="15" cy="35" r="2"></circle>
                                </g>
                            </g>
                        </svg>
                        <h2 className="font-semibold mt-4 text-[20px] leading-7">
                            Tại sao thông tin của tôi không được hiển thị ở đây?
                        </h2>
                        <p className="text-[#717171] mt-2">
                            Chúng tôi đang ẩn một số thông tin tài khoản để bảo
                            vệ danh tính của bạn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

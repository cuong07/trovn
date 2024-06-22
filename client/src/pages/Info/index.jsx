import {
    getUser,
    getListingByUserId,
    getFavoriteListing,
    updateUserAvatar,
} from "@/apis/user";
import { useEffect, useState } from "react";
import { Button } from "@/components";
import useUserStore from "@/hooks/userStore";
import { useParams } from "react-router-dom";
import { Image, Modal, Tabs, Upload, message } from "antd";
import InfoTab from "./info.tab";
import ProductList from "../Home/ProductList";
import {
    AiFillMessage,
    AiOutlineSend,
    AiFillPhone,
    AiOutlineWarning,
    AiOutlineEnvironment,
} from "react-icons/ai";
import ImgCrop from "antd-img-crop";

function Info() {
    const { id } = useParams();
    const [listings, setListing] = useState([]);
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileImage, setFileImage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getInforUser = async () => {
            const u = await getUser(id);
            setUser((pre) => ({ ...u }));

            const {
                data: { contents },
                success,
            } = await getListingByUserId(id);

            if (success) {
                setListing((prev) => [...contents]);
            }
        };
        getInforUser();
    }, [id]);

    const onChangeTabs = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: "1",
            label: "Chung",
            children: <InfoTab user={user} />,
        },
        {
            key: "3",
            label: "Phòng hiện có",
            children: <ProductList data={listings} column={2} />,
        },
    ];

    const handleOk = async () => {
        try {
            console.log(fileImage);
            if (fileImage) {
                setLoading(true);
                const { data, success } = await updateUserAvatar(fileImage);
                if (success) {
                    message.success("Cập nhật thành công");
                    setIsModalOpen(false);
                    setUser(data);
                }
                setLoading(false);
            } else {
                message.warning("Vui lòng chọn hình");
            }
        } catch (error) {
            setLoading(false);

            message.error(error.response.data.message);
            console.log(error);
        }
    };

    const handleCancel = () => {
        console.log("Cancel");
        setIsModalOpen(false);
    };

    const onChange = (file) => {
        setFileImage(file.file);
    };

    const onPreview = async (file) => {
        let src = file.url;
        console.log(file);
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div className="bg-slate-200 pt-5 pb-20">
            <div className="max-w-[1280px] mx-auto md:px-10 px-4 pd-10 bg-white pb-3">
                <div className="md:block hidden">
                    <h1 className="text-2xl font-medium pt-3">{`Hồ sơ của ${
                        user?.fullName ?? user?.username
                    }`}</h1>
                    <h5 className="text-lg ">
                        Quản lý thông tin hồ sơ để bảo mật tài khoản
                    </h5>
                    <hr className="my-5 border-black " />
                </div>
                {/* left side */}
                <div className="flex md:flex-row flex-col ">
                    <div className="md:w-4/12 w-full flex justify-start flex-col">
                        <div className="w-2/3 mx-auto flex items-center flex-col gap-2">
                            <Image
                                className="md:w-[250px] rounded-full aspect-square shadow-md w-[150px] md:h-[250px]  h-[150px] object-cover"
                                src={user?.avatarUrl}
                                alt="Ảnh đại diện"
                                decoding="async"
                            />
                            <Button onClick={() => setIsModalOpen(true)}>
                                Chọn ảnh
                            </Button>
                        </div>
                        <div className="mx-16">
                            {/* <div className="border-t-2 mt-10 relative">
                                    <span className="absolute -top-3 bg-white pr-2 text-slate-400">
                                        Tổng quan
                                    </span>
                                    <p className="my-10">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Ullam itaque,
                                        molestias dolorem et cum pariatur dolore
                                        expedita ipsam. Neque recusandae itaque
                                        nemo aliquam? Cupiditate officia
                                        officiis distinctio, eius similique
                                        consequatur.
                                    </p>
                                </div> */}
                            {/* <div className="border-t-2 mt-10 relative">
                                    <span className="absolute -top-3 bg-white pr-2 text-slate-400">
                                        Thẻ
                                    </span>
                                </div> */}
                            <span className="underline font-semibold text-xs my-4 items-center cursor-pointer justify-center flex ml-3 ">
                                <AiOutlineWarning className="mr-1 my-auto" />
                                Khiếu nại người dùng
                            </span>
                        </div>
                    </div>
                    {/* right side */}
                    <div className="md:w-8/12 w-full mr-5">
                        <div className="flex flex-col justify-between ">
                            <div className=" mb-10">
                                <div className="flex">
                                    <span className="text-3xl font-bold">
                                        {user?.fullName || user?.username}
                                    </span>
                                    <span className="flex items-center ml-10 pt-2 text-slate-500">
                                        <AiOutlineEnvironment className="mr-1" />
                                        {user.address}
                                    </span>
                                </div>
                                {/* 
                                    <span className="text-xs ">Vai trò:</span>
                                    <span className="text-xs text-cyan-400">
                                        {user.role}
                                    </span>
                                    {user.role === "HOST" ? (
                                        <span>
                                            {user.isPremium
                                                ? "- Normal"
                                                : "isPremium"}
                                        </span>
                                    ) : (
                                        ""
                                    )} */}
                            </div>
                            {/* <div>
                                    <p className="text-xs">
                                        Xếp loại người dùng
                                    </p>
                                    <p className="text-cyan-600 text-base">
                                        Normal
                                    </p>
                                </div> */}
                            <div className="flex">
                                <span className="flex text-base hover:text-sky-600 mr-3 cursor-default">
                                    <AiFillMessage className="mr-1 my-auto" />{" "}
                                    Gửi tin nhắn
                                </span>
                                <span className="flex text-base hover:text-sky-600 mx-3 cursor-default">
                                    <AiOutlineSend className="mr-1 my-auto" />
                                    Zalo
                                </span>
                                <span className="flex text-base hover:text-sky-600 mx-3 cursor-default">
                                    <AiFillPhone className="mr-1 my-auto" />
                                    Liên hệ qua SĐT
                                </span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                onChange={onChangeTabs}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                visible={isModalOpen}
                title="Cập nhật hình đại diện"
                mask
                onOk={handleOk}
                okText="Xác nhận"
                cancelText="Thoát"
                confirmLoading={loading}
                onCancel={handleCancel}
            >
                <ImgCrop
                    rotationSlider
                    cropShape="round"
                    fillColor="#ccc"
                    zoomSlider
                    showReset
                    showGrid
                    modalTitle="Chỉnh sửa hình ảnh"
                    modalOk="Xác nhận"
                    modalCancel="Thoát"
                >
                    <Upload
                        // action="https://localhost:8888/api/v1/user/avatar"
                        listType="picture-circle"
                        // fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        multiple={false}
                        beforeUpload={() => {
                            return false;
                        }}
                    >
                        {/* {fileList.length < 1 && "+ Upload"} */}
                        Tải lên
                    </Upload>
                </ImgCrop>
            </Modal>
        </div>
    );
}

export default Info;

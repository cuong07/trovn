import { useEffect, useState } from "react";
import { CheckoutAds } from "@/components";
import useUserStore from "@/hooks/userStore";
import { useNavigate } from "react-router-dom";
import { getPaymentMomo, getPaymentVNPay } from "@/apis/payment";
import { Modal, Select, message } from "antd";
import { MoMoPaymentType } from "@/constants/payment";
import { BsQrCode, BsWallet } from "react-icons/bs";
import { GrVisa } from "react-icons/gr";
import { SiVisa } from "react-icons/si";
import { BiCard } from "react-icons/bi";
import { IoCardOutline } from "react-icons/io5";
import { isEmpty } from "lodash";

const Index = () => {
    const { adsPackage } = useUserStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentTypeMoMo, setPaymentTypeMoMo] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        await handleGetPaymentMomo();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue =
                "Bạn có muốn tải lại trang không? Dữ liệu mua hàng sẽ bị mất.";
            sessionStorage.setItem("shouldNavigate", "true");
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const shouldNavigate = sessionStorage.getItem("shouldNavigate");
        if (shouldNavigate === "true") {
            sessionStorage.removeItem("shouldNavigate");
            navigate("/host");
        }
    }, [navigate]);

    const handleGetPaymentMomo = async () => {
        try {
            const { data, success } = await getPaymentMomo(paymentTypeMoMo);
            if (success) {
                window.open(data.payUrl, "_blank");
                navigate("/");
                message.success("Thành công");
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    };

    const handleGetPaymentVNPay = async () => {
        try {
            const { data, success } = await getPaymentVNPay();
            if (success) {
                window.open(data.url, "_blank");
                navigate("/");
                message.success("Thành công");
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    };

    const paymentMethods = [
        {
            name: "MOMO",
            logo: "/momo.svg",
            handle: showModal,
        },
        {
            name: "VNPay",
            logo: "/vnpay.svg",
            handle: handleGetPaymentVNPay,
        },
    ];

    const handleChange = (type) => {
        console.log(type);
        setPaymentTypeMoMo(type);
    };

    const labelRender = (props) => {
        const { label, value, icon, title } = props;
        if (label) {
            return (
                <div className="flex gap-2 items-center">
                    {title} <span>{label}</span>
                </div>
            );
        }
        return <span>Chọn hình phương thức thanh toán</span>;
    };

    return (
        <div className="grid grid-cols-2 container mx-auto h-screen">
            <div className="flex items-center h-full  flex-col my-10">
                <h2 className="text-xl font-medium mb-10">
                    Phương thức thanh toán
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((item) => (
                        <div
                            key={item.name}
                            className="gap-2  cursor-pointer rounded-2xl shadow-md border p-4 hover:bg-slate-100 items-center "
                            onClick={() => item.handle()}
                        >
                            <img
                                src={item.logo}
                                className="aspect-square w-48"
                                alt={item.name}
                            />
                            <div className="text-center mt-2 text-xl">
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex h-full items-center flex-col my-10 p-6 ">
                <h2 className="text-xl font-medium mb-10">Chi tiết đơn hàng</h2>
                {adsPackage && <CheckoutAds adsPackage={adsPackage} />}
            </div>
            <Modal
                title="Chọn hình thức thanh toán MOMO"
                open={isModalOpen}
                onOk={handleOk}
                okButtonProps={{
                    className: "h-12 font-semibold",
                    disabled: isEmpty(paymentTypeMoMo),
                }}
                cancelButtonProps={{
                    className: "h-12  font-semibold",
                }}
                onCancel={handleCancel}
                okText="Thanh toán"
                cancelText="Thoát"
            >
                <Select
                    labelRender={labelRender}
                    defaultValue="1"
                    style={{
                        width: "100%",
                    }}
                    className="h-12 text-base"
                    onChange={handleChange}
                    options={[
                        {
                            label: "Thanh toán bằng mã QR",
                            value: MoMoPaymentType.PAY_WITH_CAPTURE_WALLET,
                            title: <BsQrCode size={20} />,
                        },
                        {
                            label: "Thanh toán bằng thẻ ATM",
                            value: MoMoPaymentType.PAY_WITH_ATM,
                            title: <IoCardOutline size={20} />,
                        },
                        {
                            label: "Thanh toán bằng thẻ VISA",
                            value: MoMoPaymentType.PAY_WITH_CC,
                            title: <SiVisa size={20} />,
                        },
                        {
                            label: "Thanh toán bằng ví liên kết",
                            value: MoMoPaymentType.PAY_WITH_LINK_WALLET,
                            title: <BsWallet size={20} />,
                        },
                    ]}
                />
            </Modal>
        </div>
    );
};

export default Index;

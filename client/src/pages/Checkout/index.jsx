import { useEffect } from "react";
import { CheckoutAds } from "../../components";
import useUserStore from "../../hooks/userStore";
import { useNavigate } from "react-router-dom";
import { getPaymentMomo } from "../../apis/payment";
import { message } from "antd";

const Index = () => {
  const { adsPackage } = useUserStore();
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
      const { data, success } = await getPaymentMomo();
      if (success) {
        window.open(data.shortLink, "_blank");
        navigate("/host/ads-package");
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
      handle: handleGetPaymentMomo,
    },
    {
      name: "VNPay",
      logo: "/vnpay.svg",
      handle: handleGetPaymentMomo,
    },
  ];
  return (
    <div className="grid grid-cols-2 container mx-auto h-screen">
      <div className="flex items-center h-full  flex-col my-10">
        <h2 className="text-xl font-medium mb-10">Phương thức thanh toán</h2>
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
              <div className="text-center mt-2 text-xl">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-full items-center flex-col my-10 p-6 ">
        <h2 className="text-xl font-medium mb-10">Chi tiết đơn hàng</h2>
        {adsPackage && <CheckoutAds adsPackage={adsPackage} />}
      </div>
    </div>
  );
};

export default Index;

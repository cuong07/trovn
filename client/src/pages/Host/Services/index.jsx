import { useEffect, useState } from "react";
import { getAdvertisingPackages } from "@/apis/advertising";
import { Button } from "antd";
import useUserStore from "@/hooks/useUserStore";
import { useNavigate } from "react-router-dom";
const backgroundColors = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
];
const Index = () => {
    const [advertisingPackages, setAdvertisingPackages] = useState([]);
    const { setAdsPackage } = useUserStore();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const { data } = await getAdvertisingPackages();
            setAdvertisingPackages(data);
        })();
    }, []);

    const handleBuying = (item) => {
        setAdsPackage(item);
        navigate("/checkout");
    };

    return (
        <div className="w-full h-full bg-white rounded-lg shadow-sm p-4 ">
            <div className=" my-4">
                <h2 className="text-2xl font-medium text-center mb-6">
                    Bảng giá dịch vụ
                </h2>
                <div className="text-center mx-40">
                    <div className="mb-4">
                        TROVN xin quý khách hàng thân thương được phép điều
                        chỉnh giá dịch vụ.
                    </div>
                    <div>
                        VÌ - Giờ đây sau hơn 1 năm chúng tôi mong mỏi hơn sự
                        đồng lòng, thấu hiểu từ phía khách hàng thân thương.
                        Chúng tôi luôn mong muốn đem lại trải nghiệm tốt hơn,
                        hoàn hảo hơn cho quý khách hàng trong suốt thời gian gắn
                        bó. Chúng tôi quyết định điều chỉnh giá, để tồn tại và
                        trên cả là phục vụ hết mình vì quý khách hàng đã, đang
                        và sẽ đồng hành tại website.
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 h-full">
                {advertisingPackages.map((item, index) => (
                    <div
                        key={item.id}
                        className="h-1/2 flex flex-col justify-between rounded-xl shadow-md border"
                    >
                        <div>
                            <div
                                className={` h-14 text-lg font-medium flex items-center justify-center ${
                                    backgroundColors[
                                        index % backgroundColors.length
                                    ]
                                }`}
                            >
                                {item.name}
                            </div>
                            <ul className="p-6 list-disc grid gap-3">
                                <li>{item.description}</li>
                                <li>
                                    Thời gian hiển thị:{" "}
                                    <strong>{item.duration} ngày</strong>
                                </li>
                                <li>
                                    Xuất hiện vị trí đầu tiên ở{" "}
                                    <strong>trang chủ</strong>
                                </li>
                                <li>
                                    Tiếp cận khách hàng <strong>tốt</strong>.
                                </li>
                                <li>
                                    <strong className="text-lg">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(item.price)}
                                    </strong>
                                    .
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-center p-4">
                            <Button
                                className="h-10"
                                onClick={() => handleBuying(item)}
                            >
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;

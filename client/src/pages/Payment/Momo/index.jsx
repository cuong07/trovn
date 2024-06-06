import { Button } from "@/components";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Index = () => {
    const location = useLocation();
    const [urlParams, setUrlParams] = useState({});

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramsObject = {};

        searchParams.forEach((value, key) => {
            paramsObject[key] = value;
        });

        setUrlParams(paramsObject);
    }, [location.search]);
    console.log(urlParams["resultCode"]);
    return (
        <div className="h-screen flex items-center mt-20 flex-col gap-4">
            <h2 className="text-4xl text-slate-700 font-medium uppercase tracking-tighter">
                {urlParams["resultCode"] == 0
                    ? "Thanh toán thành công"
                    : "Thanh toán không thành công"}
            </h2>
            <div className="rounded-payment-img w-96 h-96 shadow-sm p-8">
                {urlParams["resultCode"] == 0 && (
                    <img
                        src="/success.svg"
                        alt="success"
                        className="w-full h-full"
                    />
                )}
                {urlParams["resultCode"] != 0 && (
                    <img
                        src="/error.svg"
                        alt="error"
                        className="w-full h-full"
                    />
                )}
            </div>
            <p className="text-balance leading-7 text-base text-slate-500">
                Sự hỗ trợ của bạn đánh dấu sự thành công của chúng tôi!
                <br /> Cảm ơn bạn đã thanh toán!
            </p>
            <div className="flex gap-4 ">
                <Link to="/host/ads-package">
                    <Button
                        type="primary"
                        className="uppercase h-12 w-[300px] text-lg "
                    >
                        Xem chi tiết thanh toán
                    </Button>
                </Link>
                <Link to="/">
                    <Button className="uppercase h-12 w-[300px] text-lg ">
                        Trở về trang chủ
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Index;

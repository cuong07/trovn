import { Button } from "@/components";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

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
    console.log(urlParams["vnp_ResponseCode"]);

    return (
        <div className="h-screen flex items-center mt-20 flex-col gap-8">
            <h2 className="text-4xl text-slate-700 flex items-end gap-4 font-medium uppercase tracking-tighter">
                {urlParams["vnp_ResponseCode"] == 0
                    ? "Thanh toán thành công"
                    : "Thanh toán không thành công "}
                {urlParams["vnp_ResponseCode"] == 0 ? (
                    <img
                        src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif"
                        alt="status"
                        className="w-16 h-16"
                    />
                ) : (
                    <img
                        src="https://assets-v2.lottiefiles.com/a/b5641ed8-1152-11ee-ada0-8f4e8e17569e/Y6ez38CH2M.gif"
                        alt="status"
                        className="w-16 h-16"
                    />
                )}
            </h2>
            <div className="rounded-payment-img w-96 h-96 shadow-sm p-8">
                {urlParams["vnp_ResponseCode"] == "00" && (
                    <img
                        src="/success.svg"
                        alt="success"
                        className="w-full h-full"
                    />
                )}
                {urlParams["vnp_ResponseCode"] != "00" && (
                    <img
                        src="/error.svg"
                        alt="error"
                        className="w-full h-full"
                    />
                )}
            </div>
            <p className="text-balance leading-7 text-base text-slate-500">
                Sự hỗ trợ của bạn đánh dấu sự thành công của chúng tôi! Cảm ơn
                bạn đã thanh toán!
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

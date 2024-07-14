import useUserStore from "@/hooks/useUserStore";
import { Breadcrumb } from "antd";

const Index = () => {
    const { user } = useUserStore();
    return (
        <div className="container md:px-60 px-4 mx-auto mt-8">
            <Breadcrumb separator=">">
                <Breadcrumb.Item>Tài khoản</Breadcrumb.Item>
                <Breadcrumb.Item>Đăng nhập và bảo mật</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-2">
                <h1 className="text-[32px] font-semibold leading-9">
                    Đăng nhập và bảo mật
                </h1>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div>
                        <h2 className="font-semibold text-2xl pt-[32px] pb-[24px] ">
                            Đăng nhập
                        </h2>
                        <div className="py-6  border-b">
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-base text-[#222]">
                                        Mật khẩu
                                    </div>
                                    <div className="text-[#717171]">
                                        Cập nhật lần cuối 9 tháng trước
                                    </div>
                                </div>
                                <div className="underline font-semibold text-xs cursor-pointer">
                                    Chỉnh sửa
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl pt-[32px] pb-[24px] ">
                            Tài khoản mạng xã hội
                        </h2>
                        <div className="py-6  border-b">
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-base text-[#222]">
                                        Google
                                    </div>
                                    <div className="text-[#717171]">
                                        {user.googleAccountId
                                            ? "Đã kết nối"
                                            : "Chưa kết nối"}
                                    </div>
                                </div>
                                <div className="underline font-semibold text-xs cursor-pointer">
                                    {user.googleAccountId
                                        ? "Ngắt kết nối"
                                        : "Kết nối"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl pt-[32px] pb-[24px] ">
                            Lịch sử thiết bị
                        </h2>
                        <div className="py-6  border-b">
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <svg
                                        viewBox="0 0 24 24"
                                        role="img"
                                        aria-hidden="false"
                                        aria-label="Thiết bị máy tính để bàn"
                                        focusable="false"
                                        style={{
                                            height: 30,
                                            width: 30,
                                            display: "block",
                                            fill: "currentcolor",
                                        }}
                                    >
                                        <path d="m22.5 2h-21c-.8271484 0-1.5.6728516-1.5 1.5v14c0 .8271484.6728516 1.5 1.5 1.5h8.5v3h-5.5c-.2763672 0-.5.2236328-.5.5s.2236328.5.5.5h15c.2763672 0 .5-.2236328.5-.5s-.2236328-.5-.5-.5h-5.5v-3h8.5c.8271484 0 1.5-.6728516 1.5-1.5v-14c0-.8271484-.6728516-1.5-1.5-1.5zm-21 1h21c.2753906 0 .5.2241211.5.5v11.5h-22v-11.5c0-.2758789.2241211-.5.5-.5zm11.5 19h-2v-3h2zm9.5-4h-21c-.2758789 0-.5-.2246094-.5-.5v-1.5h22v1.5c0 .2753906-.2246094.5-.5.5z"></path>
                                    </svg>
                                    <div>
                                        <div>Phiên</div>
                                        <div>
                                            vào lúc 14:29 7 tháng 5 năm 2024
                                        </div>
                                    </div>
                                </div>
                                <div className="underline font-semibold text-xs cursor-pointer">
                                    Đăng xuất khỏi thiết bị
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 flex justify-end h-fit ">
                    <div className=" border  p-4 rounded-lg sh">
                        <svg
                            viewBox="0 0 24 24"
                            role="presentation"
                            aria-hidden="true"
                            focusable="false"
                            style={{
                                height: 40,
                                width: 40,
                                display: "block",
                                fill: "rgb(255, 180, 0)",
                            }}
                        >
                            <path d="m5 20.5a.5.5 0 0 1 -.5.5h-.5v.5a.5.5 0 0 1 -1 0v-.5h-.5a.5.5 0 0 1 0-1h .5v-.5a.5.5 0 0 1 1 0v .5h.5a.5.5 0 0 1 .5.5zm1.5 1.5a.5.5 0 1 0 .5.5.5.5 0 0 0 -.5-.5zm16-20h-.5v-.5a.5.5 0 0 0 -1 0v .5h-.5a.5.5 0 0 0 0 1h .5v.5a.5.5 0 0 0 1 0v-.5h.5a.5.5 0 0 0 0-1zm-2.58 4.87a13.41 13.41 0 0 1 -6.76-3.2.37.37 0 0 0 -.63.26l.08 16.22a.38.38 0 0 0 .55.32 11.98 11.98 0 0 0 7.07-13.31.37.37 0 0 0 -.31-.3z"></path>
                            <path
                                d="m14.39 8.32a1.93 1.93 0 0 0 -3.66 0l-2.42 4.85a3.09 3.09 0 0 0 -.4 1.61 2.36 2.36 0 0 0 2.23 2.23 3.95 3.95 0 0 0 2.42-1.06 3.95 3.95 0 0 0 2.42 1.06 2.36 2.36 0 0 0 2.23-2.23 3.09 3.09 0 0 0 -.4-1.61zm-2.72 4.38c0-.05.01-1.23.89-1.23s.88 1.18.88 1.23a3.25 3.25 0 0 1 -.88 1.83 3.25 3.25 0 0 1 -.89-1.83zm3.31 3.31a2.92 2.92 0 0 1 -1.71-.77 4.3 4.3 0 0 0 1.17-2.54 2.02 2.02 0 0 0 -1.8-2.22l-.08-.01a2.02 2.02 0 0 0 -1.89 2.15l.01.08a4.29 4.29 0 0 0 1.17 2.54 2.92 2.92 0 0 1 -1.71.77 1.36 1.36 0 0 1 -1.23-1.23 2.13 2.13 0 0 1 .29-1.16l2.42-4.85c.33-.65.55-.76.94-.76s.61.11.94.76l2.42 4.85a2.13 2.13 0 0 1 .29 1.16 1.36 1.36 0 0 1 -1.23 1.23zm7.01-10.35a.5.5 0 0 0 -.43-.4 13.03 13.03 0 0 1 -8.68-4.57.52.52 0 0 0 -.77 0 13.03 13.03 0 0 1 -8.68 4.57.5.5 0 0 0 -.43.4c-1.58 8.19 1.55 14.02 9.3 17.31a.5.5 0 0 0 .39 0c7.75-3.29 10.87-9.11 9.3-17.31zm-9.49 16.3c-7.1-3.09-9.91-8.25-8.57-15.76a13.98 13.98 0 0 0 8.57-4.43 13.98 13.98 0 0 0 8.57 4.43c1.33 7.51-1.48 12.67-8.57 15.76z"
                                fill="#484848"
                            ></path>
                        </svg>
                        <h2 className="font-semibold mt-4 text-[20px] leading-7">
                            Hãy giúp tài khoản của bạn an toàn hơn
                        </h2>
                        <p className="text-[#717171] mt-2">
                            Chúng tôi luôn nỗ lực để tăng cường tính an toàn
                            trong cộng đồng của mình. Đó là lý do tại sao chúng
                            tôi xét duyệt từng tài khoản để đảm bảo mức độ an
                            toàn tối đa.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

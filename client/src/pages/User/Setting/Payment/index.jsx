import { getPaymentByUser } from "@/apis/payment";
import { exportToExcel } from "@/utils/exportToExcel";
import { Breadcrumb, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
const Index = () => {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { success, data } = await getPaymentByUser();
                if (success) {
                    setPayments(data);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const columns = [
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <div className="flex items-center">
                    <div>
                        {status ? (
                            <GoDotFill color="green" size={28} />
                        ) : (
                            <GoDotFill color="red" size={28} />
                        )}
                    </div>
                    <div>{status ? "Thành công" : "Thất bại"}</div>
                </div>
            ),
        },
        {
            title: "Mã giao dịch",
            dataIndex: "transactionId",
            key: "transactionId",
        },
        {
            title: "Nhà cung cấp",
            dataIndex: "provider",
            key: "provider",
        },
        {
            title: "Chi tiết",
            dataIndex: "note",
            key: "note",
            //   render: () => <a>Delete</a>,
        },
    ];

    const handleExport = () => {
        exportToExcel(payments, "payment_list");
    };

    return (
        <div className="container md:px-20 px-4 mx-auto mt-8">
            <Breadcrumb separator=">">
                <Breadcrumb.Item>Tài khoản</Breadcrumb.Item>
                <Breadcrumb.Item>Thanh toán và chi trả</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-2 ">
                <h1 className="text-[32px] font-semibold leading-9">
                    Thanh toán & chi trả
                </h1>
                <Button type="dashed" onClick={handleExport}>
                    Xuất Execl
                </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record) => (
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {
                                        record.orderItems[0]?.advertisingPackage
                                            .description
                                    }
                                </p>
                            ),
                            rowExpandable: (record) =>
                                record.orderItems.length !== 0,
                        }}
                        dataSource={payments}
                    />
                </div>
                <div className="col-span-1 flex justify-end h-fit ">
                    <div className=" border w-[80%] p-4 rounded-lg sh">
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
                                        d="m41.999 10v24h-4.287l1.01-.6546823c.242375-.158375.3706719-.3933125.3998895-.6646172l.0064994-.1183828c.004513-1.4230639-2.4648559-3.6737529-5.4115565-1.9238459l-.1928324.1198459-5.278 3.2416823-2.2539866.0005578c.1712874-1.0118843-.1666572-1.9090959-.8837185-1.9909612l-.1084949-.0060789-19.0018-.0005177.001-22.003z"
                                        fillOpacity=".2"
                                    ></path>
                                    <path d="m44 6c1.0543618 0 1.9181651.81587779 1.9945143 1.85073766l.0054857.14926234v28c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-12.446l3.079-2h9.367v-28h-40v24.0033177c-.51283584 0-.93550716.3860402-.99327227.8833788l-.00672773.1166212-.00007248 4.729076c-.55177975-.3192182-.93689844-.8944853-.9928825-1.5633277l-.00704502-.169066v-28c0-1.0543618.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm-20 9c3.8659932 0 7 3.1340068 7 7s-3.1340068 7-7 7-7-3.1340068-7-7 3.1340068-7 7-7zm0 2c-2.7614237 0-5 2.2385763-5 5s2.2385763 5 5 5 5-2.2385763 5-5-2.2385763-5-5-5zm-15-5c.55228475 0 1 .4477153 1 1s-.44771525 1-1 1-1-.4477153-1-1 .44771525-1 1-1z"></path>
                                </g>
                                <g fill="none" strokeWidth="2">
                                    <path d="m24.9998 32.0035177c1.3716282 0 1.5099129 2.8120004-.3683588 4.2183752l8.8925588-5.4635752c3.031-1.968 5.609.35 5.6043889 1.804-.0013889.321-.1293889.602-.4063889.783l-17.2344901 11.1920163c-.947203.6151103-2.110299.8011277-3.2021.5121216l-14.54130246-3.8491683c-.43862489-.1161066-.74410744-.5129735-.74410744-.9667052v-7.2302644c0-.5522848.44771525-1 1-1z"></path>
                                    <path d="m13.9998 37.0035177h8.051c1.2682235 0 2.2021119-.4127594 2.8457108-1.0010914"></path>
                                </g>
                            </g>
                        </svg>
                        <h2 className="font-semibold mt-4 text-[20px] leading-7">
                            Thực hiện tất cả các thanh toán qua TroVN
                        </h2>
                        <p className="text-[#717171] mt-2">
                            Luôn thanh toán và liên lạc qua Airbnb để đảm bảo
                            bạn được bảo vệ theo Điều khoản dịch vụ, Điều khoản
                            dịch vụ thanh toán, chính sách hủy và các biện pháp
                            bảo vệ khác của chúng tôi. Tìm hiểu thêm
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

import { deletePayment, getPaymentsByStatus } from "@/apis/payment";
import { Button } from "@/components";
import { formatCurrency } from "@/utils/helpers";
import { Popconfirm, Table, Tabs, Tag, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { LuBadgeCheck } from "react-icons/lu";

const Index = () => {
    const [status, setStatus] = useState(false);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data, success } = await getPaymentsByStatus(status);
                if (success) {
                    setPayments(data);
                    message.success("Thành công");
                }
            } catch (error) {
                console.log(error);
                message.error(error.message);
            }
        })();
    }, [status]);

    const columns = [
        {
            title: "Người dùng",
            dataIndex: "user",
            key: "user",
            width: 200,
            fixed: "left",
            render: (user) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 overflow-hidden relative">
                            <img
                                src={user.avatarUrl}
                                alt={user.email}
                                className="w-full h-full border shadow-md rounded-full"
                            />
                            <div className="absolute top-0 right-0 z-50">
                                {user.isPremium && (
                                    <LuBadgeCheck className="text-blue-500" />
                                )}
                            </div>
                        </div>
                        <dir>
                            <div>{user.email}</div>
                            <div className="text-[10px]">
                                {moment(user.createdAt).format("LL")}
                            </div>
                        </dir>
                    </div>
                );
            },
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => <div>{formatCurrency(amount)} VNĐ</div>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color="red">{status ? "Thành công" : "Thất bại"}</Tag>
            ),
        },
        {
            title: "Sử dụng",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive) => (
                <Tag color="gold">
                    {isActive ? "Chưa sử dụng" : "Đã sử dụng"}
                </Tag>
            ),
        },
        {
            title: "Nhà cung cấp",
            key: "provider",
            dataIndex: "provider",
            render: (provider) => <Tag color="green">{provider}</Tag>,
        },
        {
            title: "Mã giao dịch",
            key: "transactionId",
            dataIndex: "transactionId",
            render: (transactionId) => <Tag color="green">{transactionId}</Tag>,
        },
        {
            title: "Ngày thanh toán",
            key: "updatedAt",
            dataIndex: "updatedAt",
            render: (updatedAt) => (
                <div>{moment(updatedAt).startOf("minutes").fromNow()}</div>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                const { id } = record;
                const confirm = async () => {
                    try {
                        const { success } = await deletePayment(id);
                        if (success) {
                            setStatus(!status);
                            return message.success("Thành công");
                        }
                    } catch (error) {
                        console.log(error);
                        return message.error(error.message);
                    }
                };
                const cancel = (e) => {
                    console.log(e);
                    message.error("Click on No");
                };
                return (
                    <div>
                        <Popconfirm
                            title="Xóa hóa đơn"
                            placement="leftTop"
                            description="Bạn có chắc chắn xóa tác vụ này không?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Vâng"
                            cancelText="Không"
                        >
                            <Button>Xóa</Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="">
            <Tabs
                // defaultActiveKey="1"
                type="card"
                onChange={(value) => setStatus(value === 1 ? true : false)}
                items={[
                    {
                        key: 1,
                        label: "Thành công",
                        children: (
                            <Table columns={columns} dataSource={payments} />
                        ),
                    },
                    {
                        key: 2,
                        label: "Không thành công",
                        children: (
                            <Table columns={columns} dataSource={payments} />
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default Index;

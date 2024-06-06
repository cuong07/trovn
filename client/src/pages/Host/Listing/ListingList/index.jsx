/* eslint-disable react-hooks/exhaustive-deps */
import { Switch, Table, Tag, message } from "antd";
import { useEffect, useState, useMemo } from "react";
import { getHostListings, updateListing } from "@/apis/listing";
import useListingStore from "@/hooks/useListingStore";
import { Button, ListingDrawer } from "@/components";
import { formatCurrency, getTerm } from "@/utils/helpers";
import useUserStore from "@/hooks/userStore";

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState(null);
    const {
        hostListings: { contents, totalElements, currentPage, pagination },
        setHostListings,
        setCurrentPageHostListing,
        updateSomeListing,
    } = useListingStore();
    const { user } = useUserStore();

    const [listings, setListings] = useState(contents);

    const showDrawer = (record) => {
        setRecord(record);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setRecord(null);
    };

    const handleUpdate = async (record, userId, value) => {
        try {
            setUpdateLoading(true);
            const { success, data } = await updateListing(record.id, {
                isPublish: value,
                userId: userId,
            });
            setUpdateLoading(false);

            if (success) {
                setListings((prevListings) =>
                    prevListings.map((listing) =>
                        listing.id === record.id
                            ? { ...listing, ...record, isPublish: value }
                            : listing
                    )
                );
                updateSomeListing(data);
                message.success("Thành công");
            } else {
                message.error("Thất bại");
            }
        } catch (error) {
            setUpdateLoading(false);
            console.log(error);
            message.error(error.message);
        }
    };

    const columns = useMemo(
        () => [
            {
                title: "Tiêu đề",
                width: 200,
                dataIndex: "title",
                key: "name",
                fixed: "left",
                render: (title) => {
                    return <div>{title?.slice(0, 20)}</div>;
                },
            },
            {
                title: "Diện tích",
                dataIndex: "area",
                key: "area",
                fixed: "left",
                render: (area) => {
                    return (
                        <div>
                            {area}m<sup>2</sup>
                        </div>
                    );
                },
            },
            {
                title: "Loại hình cho thuê",
                dataIndex: "term",
                key: "1",
                // width: 150,
                render: (term) => {
                    return <Tag color="green">{getTerm(term)}</Tag>;
                },
            },
            {
                title: "Địa chỉ",
                dataIndex: "address",
                key: "2",
                render: (address) => {
                    return <div>{address.slice(0, 50)}</div>;
                },
            },
            {
                title: "Giá (vnd)",
                dataIndex: "price",
                key: "3",
                render: (price) => {
                    let money = parseFloat(price);
                    return <div>{formatCurrency(money)}</div>;
                },
            },
            {
                title: "Trạng thái",
                dataIndex: "isPublish",
                key: "isPublish",
                render: (isPublish, record) => (
                    <Switch
                        loading={updateLoading}
                        checked={isPublish}
                        onChange={(value) =>
                            handleUpdate(record, record.userId, value)
                        }
                    />
                ),
            },
            {
                title: "Chi tiết",
                key: "operation",
                fixed: "right",
                render: (_, record) => (
                    <Button
                        className="cursor-pointer"
                        onClick={() => showDrawer(record)}
                    >
                        Xem chi tiêt
                    </Button>
                ),
            },
        ],
        [handleUpdate, updateLoading]
    );

    useEffect(() => {
        setListings(contents);
    }, [contents]);

    useEffect(() => {
        if (user) {
            (async () => {
                try {
                    setIsLoading(true);
                    const { data, success } = await getHostListings(user.id);
                    setIsLoading(false);
                    if (success) {
                        setHostListings(data);
                        return message.success("Thành công");
                    }
                    message.error("Có lỗi xảy ra");
                } catch (error) {
                    setIsLoading(false);
                    console.log(error);
                    message.error(error.message);
                }
            })();
        }
        const fetchListings = async () => {};

        fetchListings();
    }, [setHostListings, pagination, user]);

    const handleTableChange = (page, pageSize) => {
        setCurrentPageHostListing(page, pageSize);
    };

    return (
        <div>
            <h1 className="text-xl font-medium my-4 pl-4">
                Danh sách phòng cho thuê
            </h1>
            <Table
                columns={columns}
                dataSource={listings}
                pagination={{
                    current: currentPage,
                    total: totalElements,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
                    pageSize: pagination.limit,
                    onChange: handleTableChange,
                }}
                loading={isLoading}
            />
            {record && (
                <ListingDrawer open={open} onClose={onClose} listing={record} />
            )}
        </div>
    );
};

export default Index;

import { Table, Tag, message } from "antd";
import { useEffect, useState, useMemo } from "react";
import { getHostListings } from "@/apis/listing";
import useListingStore from "@/hooks/useListingStore";
import { Button, ListingDrawer } from "@/components";
import { formatCurrency, getTerm } from "@/utils/helpers";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const {
    hostListings: { contents, totalElements, currentPage, pagination },
    setHostListings,
    setCurrentPageHostListing,
  } = useListingStore();

  const showDrawer = (record) => {
    setRecord(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setRecord(null);
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
        title: "Chi tiết",
        key: "operation",
        fixed: "right",
        render: (_, record) => (
          <Button className="cursor-pointer" onClick={() => showDrawer(record)}>
            Xem chi tiêt
          </Button>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      const { data, success } = await getHostListings();
      if (success) {
        setHostListings(data);
        message.success("Thành công");
      } else {
        message.error("Có lỗi xảy ra");
      }
      setIsLoading(false);
    };

    fetchListings();
  }, [setHostListings, pagination]);

  const handleTableChange = (page, pageSize) => {
    setCurrentPageHostListing(page, pageSize);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={contents}
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

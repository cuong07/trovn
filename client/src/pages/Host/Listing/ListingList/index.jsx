import { Table, message } from "antd";
import { useEffect, useState, useMemo } from "react";
import { getHostListings } from "../../../../apis/listing";
import useListingStore from "../../../../hooks/useListingStore";
import { ListingDrawer } from "../../../../components";

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
        title: "Full Name",
        width: 100,
        dataIndex: "title",
        key: "name",
        fixed: "left",
      },
      {
        title: "Age",
        width: 100,
        dataIndex: "area",
        key: "area",
        fixed: "left",
      },
      {
        title: "Column 1",
        dataIndex: "address",
        key: "1",
        width: 150,
      },
      {
        title: "Column 2",
        dataIndex: "address",
        key: "2",
        width: 150,
      },
      {
        title: "Column 3",
        dataIndex: "address",
        key: "3",
        width: 150,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (_, record) => (
          <div className="cursor-pointer" onClick={() => showDrawer(record)}>
            Click
          </div>
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
    console.log(page);
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

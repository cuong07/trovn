/* eslint-disable react/prop-types */
import { Switch, Table, Tag, message } from "antd";
import { formatCurrency, getTerm } from "@/utils/helpers";
import moment from "moment";
import { LuBadgeCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateListing } from "@/apis/listing";
import useListingStore from "@/hooks/useListingStore";

const Index = ({ loading, contents }) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const { updateSomeListing } = useListingStore();
  const [listings, setListings] = useState(contents);

  useEffect(() => {
    setListings(contents);
  }, [contents]);

  const handleUpdate = async (record, userId, value) => {
    console.log("run");
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
              : listing,
          ),
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
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "title",
      width: 300,
      fixed: "left",
      render: (user) => {
        return (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-12 min-w-12 h-12 overflow-hidden relative">
              <img
                src={user?.avatarUrl}
                alt={user?.email}
                className="w-full h-full object-cover  rounded-full"
              />
              <div className="absolute top-0 right-0 z-50">
                {user?.isPremium && <LuBadgeCheck className="text-blue-500" />}
              </div>
            </div>
            <dir>
              <div title={user?.email}>
                <Link to={`/user/new-info/${user?.id}`}>{user?.email}</Link>
              </div>
              <div className="text-[10px]">
                {moment(user?.createdAt).format("LL")}
              </div>
            </dir>
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      render: (address) => address.slice(0, 30),
    },
    {
      title: "Term",
      dataIndex: "term",
      key: "1",
      width: 200,
      render: (term) => <Tag color="green">{getTerm(term)}</Tag>,
    },
    {
      title: (
        <div>
          Area (m<sup>2)</sup>
        </div>
      ),
      width: 200,
      dataIndex: "area",
      key: "2",
    },
    {
      title: "Amenities (count)",
      width: 200,
      dataIndex: ["listingAmenities"],
      key: "3",
      render: (listingAmenities) => listingAmenities?.length,
    },
    {
      title: "Tag (count)",
      width: 200,
      dataIndex: ["listingTags"],
      key: "3",
      render: (listingTags) => listingTags?.length,
    },
    {
      title: "Price",
      width: 200,
      dataIndex: "price",
      key: "8",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Detail",
      width: 150,
      key: "Detail",
      render: (_, record) => {
        return <Link to={`/listing/${record.id}`}>Detail</Link>;
      },
    },
    {
      title: "Publish",
      width: 100,
      dataIndex: "isPublish",
      fixed: "right",
      key: "isPublish",
      render: (isPublish, record) => (
        <Switch
          loading={updateLoading}
          checked={isPublish}
          onChange={(value) => handleUpdate(record, record.userId, value)}
        />
      ),
    },
  ];
  return (
    <div className="h-full">
      <Table
        loading={loading}
        columns={columns}
        dataSource={listings}
        scroll={{
          x: "100%",
          y: 670,
        }}
      />
    </div>
  );
};
export default Index;

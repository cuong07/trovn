/* eslint-disable react/prop-types */
import React from "react";
import { Switch, Table, Tag } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { formatCurrency, getTerm } from "../../utils/helpers";
import moment from "moment";
import { LuBadgeCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "title",
    width: 200,
    fixed: "left",
    render: (user) => {
      return (
        <div className="flex items-center">
          <div className="w-12 h-12 overflow-hidden relative">
            <img
              src={user.avatarUrl}
              alt={user.email}
              className="w-full h-full  rounded-full"
            />
            <div className="absolute top-0 right-0 z-50">
              {user.isPremium && <LuBadgeCheck className="text-blue-500" />}
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
    render: (listingAmenities) => listingAmenities.length,
  },
  {
    title: "Tag (count)",
    width: 200,
    dataIndex: ["listingTags"],
    key: "3",
    render: (listingTags) => listingTags.length,
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
    key: "6",
    render: (isPublish) => <Switch checked={isPublish} />,
  },
  //   {
  //     title: "Action",
  //     key: "operation",
  //     // render: (record) => {
  //     //   return <Switch checked={record.name.includes(2)} />;
  //     // },
  //   },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const Index = ({ loading, contents }) => (
  <div className="h-full">
    <Table
      loading={loading}
      columns={columns}
      dataSource={contents}
      scroll={{
        x: "100%",
        y: 670,
      }}
    />
  </div>
);
export default Index;

import React from "react";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import ListAmenities from "./list.amenities";
import AddAmenities from "./add.amenities";

const Index = () => {


  const items = [
    {
      label: `Danh sách`,
      key: 1,
      children: <ListAmenities/>,
    },
    {
      label: `Thêm`,
      key: 2,
      children: <AddAmenities/>,
    },
  ];
  return(
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        items={items}
        defaultValue={0}
        defaultChecked={1}
      />
    </div>
  )
};

export default Index;

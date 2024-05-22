/* eslint-disable react/prop-types */
import { Descriptions } from "antd";

const Index = ({ adsPackage }) => {
  // const { adsPackage } = useUserStore();

  const items = [
    {
      key: "1",
      label: "Gói",
      children: adsPackage.name,
    },
    {
      key: "2",
      label: "Chi tiết gói",
      children: adsPackage.description,
    },
    {
      key: "3",
      label: "Thời gian",
      children: `${adsPackage.duration} ngày`,
    },
    {
      key: "4",
      label: "Tổng tiền",
      span: 2,
      children: (
        <div className="font-bold text-xl">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(adsPackage.price)}
        </div>
      ),
    },
  ];
  return (
    <Descriptions
      layout="vertical"
      column={1}
      labelStyle={{
        fontSize: 16,
      }}
      contentStyle={{
        fontSize: 18,
      }}
      items={items}
    />
  );
};

export default Index;

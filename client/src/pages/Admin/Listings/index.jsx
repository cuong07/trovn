import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { SearchTable } from "@/components";
import { adminGetListings } from "@/apis/listing";
import useListingStore from "@/hooks/useListingStore";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const {
    adminListings: { contents },
    isLoading,
  } = useListingStore();

  const items = [
    {
      label: `Public`,
      key: 1,
      children: <SearchTable loading={isLoading} contents={contents} />,
    },
    {
      label: `Non public`,
      key: 2,
      children: <SearchTable loading={isLoading} contents={contents} />,
    },
  ];

  useEffect(() => {
    (async () => {
      await adminGetListings();
    })();
  }, []);

  return (
    <div className="h-full">
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        items={items}
        defaultValue={0}
        defaultChecked={1}
        onChange={(number) => setSelectedTab(number)}
      />
    </div>
  );
};

export default Index;

import { Steps, message } from "antd";
import { Button, ListingForm, MapLocation } from "../../../../components";
import { useState } from "react";

const steps = [
  {
    title: "Thồng tin",
  },
  {
    title: "Địa chỉ",
  },
  {
    title: "Chi tiết",
  },
  {
    title: "Hình ảnh",
  },
  {
    title: "Thành công",
  },
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="relative w-full h-full p-4 overflow-hidden">
      <Steps current={current} items={items} className="mb-4" />

      <div className=" overflow-hidden">
        {current === 0 && (
          <div className="w-full h-full">
            <ListingForm />
          </div>
        )}
        {current === 1 && (
          <div className="h-[700px]">
            <MapLocation />
          </div>
        )}
        {current === 2 && (
          <div className="h-[700px]">{/* <MapLocation /> */}chi tiết</div>
        )}
        {current === 3 && <div className="w-full h-full">End</div>}
      </div>

      <div className="flex gap-4  absolute bottom-0 w-full bg-white py-2">
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;

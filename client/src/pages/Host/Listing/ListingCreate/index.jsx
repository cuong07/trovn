import { Modal, Result, Steps, message } from "antd";
import {
  Button,
  ListingDetailStep,
  ListingForm,
  MapLocation,
  UploadImage,
} from "../../../../components";
import { useEffect, useState } from "react";
import { getAllAmenity } from "../../../../apis/amenities";
import { getLocations } from "../../../../apis/location";
import useListingStore from "../../../../hooks/useListingStore";
import { Link } from "react-router-dom";
import { createListing } from "../../../../apis/listing";

const steps = [
  {
    title: "Thồng tin",
    status: "error",
    subTitle: "hello",
  },
  {
    title: "Địa chỉ",
    status: "error",
    subTitle: "hello",
  },
  {
    title: "Chi tiết",
    status: "error",
    subTitle: "hello",
  },
  {
    title: "Hình ảnh",
    status: "error",
    subTitle: "hello",
  },
  {
    title: "Thành công",
    status: "error",
    subTitle: "hello",
  },
];

const Index = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const { newListing } = useListingStore();
  const [amenities, setAmenities] = useState([]);
  const [locations, setLocations] = useState([]);

  const showModalConfirm = () => {
    setIsShowModal(true);
  };

  const closeModalConfirm = () => {
    setIsShowModal(false);
  };
  const next = () => {
    setCurrent(current + 1);
    if (+current === 1) {
      closeModalConfirm();
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  useEffect(() => {
    (async () => {
      try {
        const [res1, res2] = await Promise.all([
          getAllAmenity(),
          getLocations(),
        ]);
        setAmenities(res1.data);
        setLocations(res2.data);
      } catch (error) {
        message.error(error.message);
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(newListing);
      const res = await createListing(newListing);
      console.log(res);
      message.success("Thêm thành công");
    } catch (error) {
      message.error(error.message);
    }
    console.log(newListing);
    message.success("Processing complete!");
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 overflow-auto">
      <Steps current={current} items={items} className="mb-4" responsive />
      <div className="flex justify-end gap-4  w-full  p-2">
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Quay lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => (+current === +1 ? showModalConfirm() : next())}
          >
            Tỉếp tục
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => handleSubmit()}>
            Hoàn thành
          </Button>
        )}
      </div>
      <div className=" overflow-hidden h-full ">
        {current === 0 && (
          <div className="w-full ">
            <ListingForm amenities={amenities} locations={locations} />
          </div>
        )}
        {current === 1 && (
          <div className="h-[700px]">
            <MapLocation />
          </div>
        )}
        {current === 2 && (
          <div className="h-full">
            <ListingDetailStep
              newListing={newListing}
              amenities={amenities}
              locations={locations}
            />
          </div>
        )}
        {current === 3 && (
          <div className="w-full h-full">
            <UploadImage />
          </div>
        )}
        {current === 4 && (
          <div className="w-full h-full">
            {/* <Result
              status="success"
              title="Successfully Purchased Cloud Server ECS!"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={
                <div className="flex justify-center gap-4">
                  <div key="console">
                    <Button type="primary">Go Console</Button>
                  </div>
                  <div key="buy">
                    <Button>Buy Again</Button>
                  </div>
                </div>
              }
            /> */}
            <ListingDetailStep
              newListing={newListing}
              amenities={amenities}
              locations={locations}
            />
          </div>
        )}
      </div>
      <Modal
        title="Bạn chắc chắn là địa chỉ này không?"
        centered
        open={isShowModal}
        onOk={next}
        cancelText="Thoát"
        okText="Đồng ý"
        onCancel={closeModalConfirm}
      >
        <h2>
          {newListing?.address?.split("").length === 0
            ? "Bạn chưa chọn địa chỉ nào"
            : newListing.address}
        </h2>
      </Modal>
    </div>
  );
};

export default Index;

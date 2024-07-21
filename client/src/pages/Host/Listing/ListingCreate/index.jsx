import { Modal, Result, Spin, Steps, message } from "antd";
import {
    Button,
    ListingDetailStep,
    ListingForm,
    MapLocation,
    UploadImage,
} from "@/components";
import { useEffect, useState } from "react";
import { getLocations } from "@/apis/location";
import useListingStore from "@/hooks/useListingStore";
import { Link } from "react-router-dom";
import { createListing } from "@/apis/listing";
import { getAllTags } from "@/apis/tag";
import { getAllAmenity } from "@/apis/amenities";

const steps = [
    {
        title: "Thồng tin",
        subTitle: "hello",
    },
    {
        title: "Địa chỉ",
        subTitle: "hello",
    },

    {
        title: "Hình ảnh",
        subTitle: "hello",
    },
    {
        title: "Thành công",
        subTitle: "hello",
    },
];

const Index = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [current, setCurrent] = useState(0);
    const { newListing, resetNewListing } = useListingStore();
    const [amenities, setAmenities] = useState([]);
    const [tags, setTags] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
                const [res1, res2, res3] = await Promise.all([
                    getAllAmenity(),
                    getLocations(),
                    getAllTags(),
                ]);
                setAmenities(res1.data);
                setLocations(res2.data.contents);
                setTags(res3.data);
            } catch (error) {
                message.error(error.message);
                console.log(error);
            }
        })();
    }, []);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const { success } = await createListing(newListing);
            setIsLoading(false);
            setIsSuccess(success);
            if (success) {
                message.success("Thêm thành công");
                resetNewListing();
                return;
            }
        } catch (error) {
            setIsLoading(false);
            message.error(error.response.data.message);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full h-full p-4 overflow-scroll">
            <Steps
                current={current}
                items={items}
                className="mb-4"
                responsive
            />
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
                        onClick={() =>
                            +current === +1 ? showModalConfirm() : next()
                        }
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
            <div className="  h-full ">
                {current === 0 && (
                    <div className="w-full">
                        <ListingForm
                            amenities={amenities}
                            tags={tags}
                            locations={locations}
                        />
                    </div>
                )}
                {current === 1 && (
                    <div className="h-[800px]">
                        <MapLocation />
                    </div>
                )}
                {current === 2 && (
                    <div className="w-full h-full">
                        <UploadImage />
                    </div>
                )}
                {current === 3 && (
                    <div className="w-full h-full">
                        {isSuccess && (
                            <Result
                                status="success"
                                title="Thêm phòng thành công"
                                subTitle="Yêu cầu thêm phòng của bạn đã được gửi để  vui lòng đợi để đợi để được phê duyệt"
                                extra={
                                    <div className="flex justify-center gap-4">
                                        <div key="console">
                                            <Link to="/host/listing/list">
                                                <Button type="primary">
                                                    Quay trở lại trang quản trị
                                                </Button>
                                            </Link>
                                        </div>
                                        <div key="buy">
                                            <Link to="/host/listing/create">
                                                <Button>Tạo Thêm</Button>
                                            </Link>
                                        </div>
                                    </div>
                                }
                            />
                        )}
                        {!isSuccess && (
                            <ListingDetailStep
                                newListing={newListing}
                                amenities={amenities}
                                locations={locations}
                            />
                        )}
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
            <Spin spinning={isLoading} fullscreen />
        </div>
    );
};

export default Index;

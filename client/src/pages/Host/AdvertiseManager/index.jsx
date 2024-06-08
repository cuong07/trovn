import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Table, Tag, message } from "antd";
import moment from "moment";
import Dragger from "antd/es/upload/Dragger";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FaArrowRight } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";

import { Services } from "../..";
import useUserStore from "@/hooks/userStore";
import { getOrdersByCurrentUser } from "@/apis/order";
import { formatCurrency } from "@/utils/helpers";
import { InputField, ModalCreate } from "@/components";
import { createBanner } from "@/apis/banner";

import dayjs from "dayjs";

const schema = yup
  .object({
    title: yup.string().min(6).required(),
    description: yup.string().min(8).required(),
    fromDate: yup.date(),
    toDate: yup.date(),
    paymentId: yup.string(),
    file: yup.object(),
  })
  .required();
const Index = () => {
  const { user } = useUserStore();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [adsPackageSelect, setAdsPackageSelect] = useState(null);

  const showModal = (record) => {
    const { payment } = record;
    setAdsPackageSelect(record);
    setValue("paymentId", payment.id);
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      const value = getValues();
      setConfirmLoading(true);
      const { data, success } = await createBanner(value);
      setConfirmLoading(false);
      if (success) {
        message.success("Thành công");
      }
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Mã giao dịch",
      dataIndex: ["payment", "transactionId"],
      key: "transactionId",
    },
    {
      title: "Gói",
      dataIndex: ["advertisingPackage", "name"],
      key: "packageName",
    },

    {
      title: "Thời hạn (ngày)",
      dataIndex: ["advertisingPackage", "duration"],
      key: "duration",
    },
    {
      title: "Giá (vnd)",
      dataIndex: ["advertisingPackage", "price"],
      key: "price",
      render: (price) => <div>{formatCurrency(price)}</div>,
    },
    {
      title: "Tổng thanh toán (vnd)",
      dataIndex: ["payment", "amount"],
      render: (price) => <div>{formatCurrency(price)}</div>,
    },
    {
      title: "Nhà cung cấp thanh toán",
      dataIndex: ["payment", "provider"],
      key: "paymentProvider",
    },
    {
      title: "Tình trạng thanh toán",
      dataIndex: ["payment", "status"],
      key: "paymentStatus",
      render: (status) => (
        <Tag
          className="h-8 text-sm flex items-center w-fit"
          color={status ? "green" : "red"}
        >
          {status ? "Thành công" : "Thất bại"}
        </Tag>
      ),
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <div>{moment(date).calendar()}</div>,
    },
    {
      title: "Sử dụng",
      key: "sudung",
      render: (_, record) => {
        const { payment } = record;
        return (
          <div>
            <Button
              className="h-10"
              onClick={() => showModal(record)}
              disabled={!payment?.isActive}
            >
              {payment?.isActive ? "Sử dụng" : "Đã sử dụng"}
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await getOrdersByCurrentUser();
      setOrders(data);
    })();
  }, []);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      description: "",
      title: "",
      fromDate: "",
      toDate: "",
      file: "",
      paymentId: "",
    },
    reValidateMode: "onBlur",
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const disabledDaysDate = (current, { from }) => {
    if (current && current < moment().startOf("day")) {
      return true;
    }
    if (from) {
      return (
        Math.abs(current.diff(from, "days")) >
        +adsPackageSelect?.advertisingPackage?.duration
      );
    }
    return false;
  };

  // isPremium === false
  {
    !user?.isPremium && <Services />;
  }

  const onSumit = () => {
    const data = getValues();
  };

  return (
    <div className="rounded-lg bg-white p-4 h-full">
      <Table columns={columns} dataSource={orders} rowKey="id" />
      <ModalCreate
        open={open}
        handleOk={handleOk}
        // handleOk={onSumit}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        width={800}
        title="Tạo mới bảng quảng bá"
      >
        <div className="w-full">
          <Form layout="vertical">
            <InputField
              name="title"
              control={control}
              errors={errors.title}
              label="Tiêu đề"
            />
            <InputField
              name="description"
              control={control}
              errors={errors.description}
              label="Mô tả chi tiết"
            />
            <Form.Item
              label={
                <span className="flex gap-2 items-center">
                  Thời gian hiển thị (từ ngày {<FaArrowRight size={10} />} ngày)
                </span>
              }
              className="m-2"
            >
              <DatePicker.RangePicker
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(dates) => {
                  setValue(
                    "fromDate",
                    dates
                      ? dayjs(dates[0]).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                      : null
                  );
                  setValue(
                    "toDate",
                    dates
                      ? dayjs(dates[1]).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                      : null
                  );
                }}
                disabledDate={disabledDaysDate}
                className="flex h-10 rounded-md border box-border"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="flex gap-2 items-center">
                  Hình này sẽ đc hiển thị trên trang chủ
                </span>
              }
              className="m-2"
            >
              <Dragger
                name="file"
                multiple={false}
                onChange={(info) => {
                  const file = info.file;
                  const img = new Image();
                  img.src = URL.createObjectURL(file);

                  function isAspectRatioValid(image) {
                    const aspectRatioThreshold = 3.5;
                    const aspectRatio = image.width / image.height;

                    if (Math.abs(aspectRatio - aspectRatioThreshold) < 0.5) {
                      return true;
                    } else {
                      return false;
                    }
                  }

                  img.onload = function () {
                    if (!isAspectRatioValid(img)) {
                      message.warning(
                        "Tỷ lệ hình không đúng như mong đợi 3.5:1"
                      );
                      return message.error(
                        "Vui lòng chọn hình khác để đảm bảo hình được sắc nét nhất"
                      );
                    }
                  };
                  setValue("file", info.file);
                }}
                onDrop={(e) => {
                  console.log("Dropped files", e.dataTransfer.files);
                }}
                beforeUpload={() => {
                  return false;
                }}
              >
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </div>
      </ModalCreate>
    </div>
  );
};

export default Index;

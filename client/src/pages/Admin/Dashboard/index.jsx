import {
  getAnalyticLocationCountListing,
  getAnalyticTopUserWithMostListing,
  getAnalyticsAmountPayment,
  getAnalyticsNewListing,
  getAnalyticsNewUserRegister,
} from "@/apis/analytics";
import { LineChartCustom, Statistic } from "@/components";
import MapClusters from "@/components/MapClusters";
import PieChart from "@/components/PieChart";
import useAnalyticsStore from "@/hooks/useAnalyticsStore";
import { formatCurrency } from "@/utils/helpers";
import { Avatar, Table, Tag, message } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const {
    chart: { newListing, location },
    payment: { thisMonth, lastMonth, percent },
    topUser,
    newUser,
    setAnalyticsNewListing,
    setAmountPayment,
  } = useAnalyticsStore();
  useEffect(() => {
    (async () => {
      try {
        const [res1, res2] = await Promise.all([
          getAnalyticsNewListing(),
          getAnalyticsAmountPayment(),
          getAnalyticsNewUserRegister(),
          getAnalyticTopUserWithMostListing(),
          getAnalyticLocationCountListing(),
        ]);

        if (res1) {
          const { data, success } = res1;
          if (success) {
            setAnalyticsNewListing(data.labels, data.data);
          }
        }

        if (res2) {
          const { data, success } = res2;
          console.log(data);
          if (success) {
            setAmountPayment(data);
          }
        }
      } catch (error) {
        message.error(error.message);
      }
    })();
  }, [setAnalyticsNewListing, setAmountPayment]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình",
      dataIndex: "avatarUrl",
      key: "avatar",
      render: (avatarUrl) => <Avatar className="size-12" src={avatarUrl} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Link to={`/user/new-info/${record.id}`} className="text-base">
          {text}
        </Link>
      ),
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số phòng cho thuê",
      dataIndex: ["_count", "listings"],
      key: "_count",
      render: (count) => (
        <div className="flex justify-center">
          <Tag color="green" className="text-center text-lg">
            {count}
          </Tag>
        </div>
      ),
    },
    {
      title: "Chi tiêu",
      dataIndex: ["orderItems"],
      key: "orderItems",
      render: (amount) => {
        const total = amount?.reduce((acc, curr) => acc + curr.amount, 0);
        return <div className="font-semibold">{formatCurrency(total)} VNĐ</div>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-8 h-full overflow-scroll">
      <div className="grid grid-cols-4  gap-8">
        <Statistic
          percent={percent}
          text="Thu nhập tháng này"
          value={thisMonth}
          type="currency"
        />
        <Statistic
          // percent={percent}
          text="Thu nhập tháng trước"
          type="currency"
          value={lastMonth}
        />
        <Statistic
          percent={newUser.percent}
          text="Người dùng mới tháng này"
          value={newUser.thisMonth}
        />
        <Statistic
          // percent={percent}
          text="Người dùng mới tháng trước"
          value={newUser.lastMonth}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1 ">
        <div className="flex flex-col gap-6 items-center h-full">
          <div className="h-1/2 w-full">
            <LineChartCustom
              data={newListing.data}
              labels={newListing.labels}
              label="Số lượng: "
            />
          </div>
          <div className="h-1/2 w-full">
            <PieChart
              labels={location.labels}
              data={location.data}
              label="Số lượng: "
            />
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={topUser} pagination="false" />
        </div>
      </div>
      <div className=" ">
        <h2 className="text-3xl font-semibold text-center my-4">
          Mật độ phòng
        </h2>
        <MapClusters />
      </div>
    </div>
  );
};

export default Index;

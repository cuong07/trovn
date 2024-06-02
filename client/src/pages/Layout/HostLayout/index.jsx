import { Layout, Menu } from "antd";
import { HostHeader, MainHeader } from "@/commons";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "@/apis/user";
const { Content, Sider } = Layout;
const hostNav = [
  {
    key: 1,
    children: [
      {
        key: 1.1,
        label: <Link to="listing/list">Danh sách</Link>,
        path: "",
      },
      {
        key: 1.2,
        label: <Link to="listing/create">Thêm</Link>,
        path: "",
      },
    ],
    label: "Cho thuê",
  },
  {
    key: 2,
    label: "Quảng bá",
    children: [{ key: 2.1, label: <Link to="ads-package">Gói quảng bá</Link> }],
  },
];

const HostLayout = () => {
  useEffect(() => {
    (async () => {
      await getCurrentUser();
    })();
  }, []);
  return (
    <Layout className="h-svh">
      <div className="h-20">
        <HostHeader />
      </div>
      <Layout>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content className="rounded-lg overflow-hidden  h-screen">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default HostLayout;

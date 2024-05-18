import { Breadcrumb, Layout, Menu, theme } from "antd";
import { MainHeader } from "../../../commons";
import { Link, Outlet } from "react-router-dom";
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
];

const HostLayout = () => {
  return (
    <Layout className="h-svh">
      <div className="h-20">
        <MainHeader />
      </div>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1.1"]}
            defaultOpenKeys={["1.1"]}
            className="h-full"
            items={hostNav}
          />
        </Sider>
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

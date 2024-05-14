import { Outlet } from "react-router-dom";
import { MainFooter, MainHeader } from "../../../commons";

import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

const Index = () => {
  return (
    <Layout className="bg-none bg-transparent">
      <Header className="h-20  bg-transparent p-0 m-0 fixed shadow-sm left-0 z-50 right-0 bg-white">
        <MainHeader />
      </Header>
      <Content className="h-screen  mt-20">
        <Outlet />
      </Content>
      <Footer className="bg-transparent">
        <MainFooter />
      </Footer>
    </Layout>
  );
};

export default Index;

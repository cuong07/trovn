import React from "react";
import { Outlet } from "react-router-dom";
import { MainFooter, MainHeader } from "../../../commons";

import { Flex, Layout } from "antd";
const { Header, Content, Footer } = Layout;

const index = () => {
  return (
    <Layout className="bg-none bg-transparent">
      <Header className="h-20  bg-transparent p-0 m-0 fixed left-0 right-0 bg-white" >
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

export default index;

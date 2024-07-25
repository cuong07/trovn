/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation } from "react-router-dom";
import { MainFooter, MainHeader, MenuMobile } from "@/commons";
import { Chatbot } from "@/pages";
import { Layout } from "antd";
import useAmenityStore from "@/hooks/useAmenityStore";
import { getAllAmenity } from "@/apis/amenities";
import { useEffect } from "react";
import { getCurrentUser } from "@/apis/user";
const { Header, Content, Footer } = Layout;

const TOKEN = JSON.parse(localStorage.getItem("token"));

const Index = () => {
  const { setAmenities } = useAmenityStore();
  const location = useLocation();

  const isChatPage = location.pathname.includes("/chat");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllAmenity();
        // const res = await getLocations(1, 10);
        setAmenities(data);
        // if (TOKEN) {
        await getCurrentUser();
        // }
        // setLocations(res?.data?.contents);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [TOKEN]);
  return (
    <Layout className="bg-none bg-transparent">
      <Header className="h-20  bg-transparent p-0 m-0 fixed shadow-sm left-0 z-50 right-0 bg-white">
        <MainHeader />
      </Header>
      <Content className="mt-20">
        <Outlet />
        {/* <Chatbot /> */}
      </Content>
      {!isChatPage && (
        <Footer className="bg-transparent p-0">
          <MainFooter />
        </Footer>
      )}
      <div className="sticky md:hidden block bottom-0 w-full h-16 bg-white z-[9999]">
        <MenuMobile />
      </div>
    </Layout>
  );
};

export default Index;

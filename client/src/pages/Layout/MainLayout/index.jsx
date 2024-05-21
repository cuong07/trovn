import { Outlet } from "react-router-dom";
import { MainFooter, MainHeader } from "../../../commons";

import { Layout } from "antd";
import useMessage from "antd/es/message/useMessage";
import useLocationStore from "../../../hooks/useLocationStore";
import useAmenityStore from "../../../hooks/useAmenityStore";
import { getAllAmenity } from "../../../apis/amenities";
import { getLocations } from "../../../apis/location";
import { useEffect } from "react";
const { Header, Content, Footer } = Layout;

const Index = () => {
  const { setLocations } = useLocationStore();
  const { amenities, setAmenities } = useAmenityStore();

  useEffect(() => {
    (async () => {
      const { data } = await getAllAmenity();
      const res = await getLocations();
      setAmenities(data);
      setLocations(res.data);
    })();
  }, []);
  return (
    <Layout className="bg-none bg-transparent">
      <Header className="h-20  bg-transparent p-0 m-0 fixed shadow-sm left-0 z-50 right-0 bg-white">
        <MainHeader />
      </Header>
      <Content className="mt-20">
        <Outlet />
      </Content>
      <Footer className="bg-transparent">
        <MainFooter />
      </Footer>
    </Layout>
  );
};

export default Index;

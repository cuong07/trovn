import { Layout } from "antd";
import { HostHeader } from "@/commons";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "@/apis/user";
const { Content } = Layout;

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

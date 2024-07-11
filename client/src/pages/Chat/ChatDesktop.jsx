/* eslint-disable react/prop-types */
import { SidebarChat } from "@/components";
import { Outlet } from "react-router-dom";

const ChatDesktop = ({ isLoading }) => {
    return (
        <div
            style={{
                height: "calc(100vh - 80px)",
            }}
            className="overflow-hidden"
        >
            <div className="  rounded-md shadow-lg  h-full grid grid-cols-12">
                <div className="col-span-3 h-full ">
                    <SidebarChat isLoading={isLoading} />
                </div>
                <div className="col-span-9 h-full  border-l">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ChatDesktop;

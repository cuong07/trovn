/* eslint-disable react/prop-types */
import { SidebarChat } from "../../components";
import { Outlet } from "react-router-dom";

const ChatDesktop = ({ isLoading }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
      }}
      className="overflow-hidden"
    >
      <div className="container mx-auto  rounded-md shadow-lg  h-full grid grid-cols-3">
        <div className="col-span-1  h-full">
          <SidebarChat isLoading={isLoading} />
        </div>
        <div className="col-span-2 h-full rounded-md shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ChatDesktop;

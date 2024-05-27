import React, { useEffect } from "react";
import io from "socket.io-client";
import useUserStore from "../../hooks/userStore";
import { MessagePage, SidebarChat } from "../../components";
import { Outlet, useNavigate } from "react-router-dom";
import { getConversations } from "../../apis/conversation";
import { message } from "antd";

const Index = () => {
  const { setOnlineUser, setSocketConnection } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_APP_BACKEND_URL, {
      auth: {
        token: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    socketConnection.on("connection", () => {
      console.log("Connected to server");
    });
    socketConnection.on("onlineUser", (data) => {
      setOnlineUser(data);
    });

    setSocketConnection(socketConnection);
    (async () => {
      try {
        const { success } = await getConversations();
        if (!success) {
          return message.error("Vui lòng đăng nhập");
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
      }}
      className="overflow-hidden"
    >
      <div className="container mx-auto  rounded-md shadow-lg  h-full grid grid-cols-3">
        <div className="col-span-1  h-full">
          <SidebarChat />
        </div>
        <div className="col-span-2 h-full rounded-md shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Index;

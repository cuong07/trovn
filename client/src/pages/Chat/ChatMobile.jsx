import React from "react";
import { SidebarChat } from "@/components";

const ChatMobile = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 160px)",
      }}
      className="overflow-hidden"
    >
      <SidebarChat />
    </div>
  );
};

export default ChatMobile;

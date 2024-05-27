import React, { useEffect, useState } from "react";
import useUserStore from "../../hooks/userStore";
import { NavLink } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa";
import { Avatar } from "antd";
import { BiLogOut } from "react-icons/bi";
import { ChatUser } from "..";
import useConversationStore from "../../hooks/useConversationStore";

const Index = () => {
  const { user, socketConnection } = useUserStore();
  const { setConversations, conversations } = useConversationStore();

  useEffect(() => {
    if (socketConnection && user) {
      socketConnection.emit("sidebar", user.id);
      socketConnection.on("conversation", (data) => {
        setConversations(data);
      });
    }
  }, [setConversations, socketConnection, user]);

  return (
    <div className="w-full h-full  ">
      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Tin nhắn</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className=" h-full w-full overflow-x-hidden overflow-y-auto scrollbar">
          {conversations.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}
          {conversations.map((conv, index) => (
            <ChatUser conversation={conv} user={user} key={conv?.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

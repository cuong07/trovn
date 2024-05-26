import React, { useEffect, useRef, useState } from "react";
import useUserStore from "../../hooks/userStore";
import { Link, useParams } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import moment from "moment";
import { FaAngleLeft, FaDotCircle } from "react-icons/fa";
import { Avatar } from "antd";
import { HiDotsVertical } from "react-icons/hi";
import { InputChat, MessageItem } from "..";
import { LuBadgeCheck } from "react-icons/lu";

const Index = () => {
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);

  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    avatarUrl: "",
    online: false,
    id: "",
  });
  const [message, setMessage] = useState({
    text: "",
  });

  const { id } = useParams();
  const { user, socketConnection } = useUserStore();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("messagePage", id);
      socketConnection.emit("seen", id);

      const handleMessageUser = (data) => {
        setDataUser(data);
      };

      const handleMessage = (data) => {
        if (data.conversationId === id) {
          setAllMessages(data.messages);
        }
      };

      socketConnection.on("messageUser", handleMessageUser);
      socketConnection.on("message", handleMessage);

      return () => {
        socketConnection.off("messageUser", handleMessageUser);
        socketConnection.off("message", handleMessage);
      };
    }
  }, [socketConnection, id, user]);

  const handleOnChange = (e) => {
    const { value } = e.target;

    setMessage((prev) => ({
      ...prev,
      text: value,
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text) {
      if (socketConnection) {
        socketConnection.emit("newMessage", {
          sender: user?.id,
          receiver: id,
          text: message.text,
          userId: user?.id,
        });
        setMessage({
          text: "",
        });
      }
    }
  };

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessages]);

  return (
    <div className=" h-full flex flex-col">
      <header className="h-16 sticky top-0 bg-white flex justify-between shadow-sm items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar width={50} height={50} src={dataUser?.avatarUrl} />
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-1 my-0 text-ellipsis line-clamp-1">
              {dataUser?.username}
              <LuBadgeCheck className="text-blue-400" size={12} />
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <div className="text-green-500 flex gap-1 items-center">
                  <FaDotCircle size={10} /> <span>online</span>
                </div>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
      </header>
      <div
        className="flex flex-col gap-2 p-4 overflow-scroll  h-[800px] pb-20 "
        // style={{
        //   backgroundImage: "url(/wallapaper.jpg)",
        // }}
        ref={currentMessage}
      >
        {allMessages.map((msg, index) => (
          <MessageItem message={msg} meId={user?.id} key={msg?.id} />
        ))}
      </div>
      <div className="sticky h-20 bg-white bottom-0 w-full border-t m-2">
        <InputChat
          message={message}
          handleOnChange={handleOnChange}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Index;

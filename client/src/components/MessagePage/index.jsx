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
import { useChatScroll } from "../../hooks/useChatScroll";

const Index = () => {
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);
  const typingTimeoutRef = useRef(null);

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

  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const bottomRef = useRef(null);

  const { id } = useParams();
  const { user, socketConnection } = useUserStore();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("messagePage", id);

      const handleMessageUser = (data) => {
        setDataUser(data);
      };

      const handleMessage = (data) => {
        if (data.conversationId === id) {
          setAllMessages(data.messages);
          socketConnection.emit("seen", id);
        }
      };

      const handleTyping = () => {
        setOtherUserTyping(true);
      };

      const handleStopTyping = () => {
        setOtherUserTyping(false);
      };

      socketConnection.on("messageUser", handleMessageUser);
      socketConnection.on("message", handleMessage);
      socketConnection.on("typing", handleTyping);
      socketConnection.on("stopTyping", handleStopTyping);

      return () => {
        socketConnection.off("messageUser", handleMessageUser);
        socketConnection.off("message", handleMessage);
        socketConnection.off("typing", handleTyping);
        socketConnection.off("stopTyping", handleStopTyping);
      };
    }
  }, [socketConnection, id, user]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setMessage((prev) => ({
      ...prev,
      text: value,
    }));
    if (!isTyping) {
      setIsTyping(true);
      socketConnection.emit("typing", id);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socketConnection.emit("stopTyping", id);
    }, 2000);
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
        setIsTyping(false);
        socketConnection.emit("stopTyping", id);
      }
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [allMessages, otherUserTyping]);

  // useChatScroll({
  //   currentMessage,
  //   bottomRef,
  //   loadMore: () => {},
  //   shouldLoadMore: false,
  //   count: allMessages?.length,
  // });

  return (
    <div className="h-full flex flex-col">
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
        className="flex flex-col gap-2 px-4 overflow-scroll  flex-grow h-[600px]"
        ref={currentMessage}
      >
        {allMessages.map((msg, index) => (
          <MessageItem message={msg} meId={user?.id} key={msg?.id} />
        ))}
        {otherUserTyping && (
          <div className="">
            <img
              className=" w-20 h-10 object-cover rounded-t-xl border rounded-br-xl  shadow-lg"
              src="https://assets-v2.lottiefiles.com/a/ebd78ab6-1177-11ee-850f-cb40fdafcf3e/PAX68whfkT.gif"
              alt="typing..."
            />
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
      <div className="sticky h-20 bg-white bottom-0 w-full border-t ">
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

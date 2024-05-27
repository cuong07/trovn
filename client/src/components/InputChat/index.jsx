/* eslint-disable react/prop-types */
import React from "react";
import { IoMdSend } from "react-icons/io";

const Index = ({ message, handleOnChange, handleSendMessage }) => {
  return (
    <form className="h-full flex px-4 gap-2" onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Type here message..."
        className="py-1 px-4 outline-none w-full h-full"
        value={message.text}
        onChange={handleOnChange}
      />
      <button className="text-primary hover:text-secondary">
        <IoMdSend size={28} />
      </button>
    </form>
  );
};

export default Index;

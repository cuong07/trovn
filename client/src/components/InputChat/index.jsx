/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiGrin } from "react-icons/bs";
import { Popover } from "antd";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Index = ({
    message,
    handleOnChange,
    handleSendMessage,
    setShowEmoji,
    onEmojiClick,
}) => {
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <form
            className=" h-20 flex px-4 gap-2"
            onSubmit={handleSendMessage}
        >
            <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="py-1 px-4 outline-none text-base w-full h-full"
                value={message.text}
                onChange={handleOnChange}
            />

            <Popover
                content={
                    <Picker
                        locale="vi"
                        theme="light"
                        data={data}
                        onEmojiSelect={(e) => onEmojiClick(e.native)}
                    />
                }
                trigger="click"
                arrow={false}
                open={open}
                className="bg-transparent"
                placement="topRight"
                onOpenChange={handleOpenChange}
            >
                <div
                    className="mr-4 h-full flex items-center"
                    onClick={() => setShowEmoji((prev) => !prev)}
                >
                    <BsEmojiGrin size={24} color="#E51D55" />
                </div>
            </Popover>

            <button className="text-primary hover:text-secondary">
                <IoMdSend size={28} />
            </button>
        </form>
    );
};

export default Index;

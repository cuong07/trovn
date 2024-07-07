/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiGrin } from "react-icons/bs";
import { Button, Popover } from "antd";
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
            className="h-16 border flex px-4 bg-white gap-2 m-4 rounded-lg"
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

            <div className="h-full flex items-center">
                <Button
                    type="primary"
                    className="text-primary flex h-12 items-center gap-2 text-lg hover:text-secondary"
                >
                    Gửi
                    <IoMdSend size={28} />
                </Button>
            </div>
        </form>
    );
};

export default Index;

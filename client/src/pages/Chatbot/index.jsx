import React, { useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { BsChatLeftTextFill } from "react-icons/bs";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          right: 48,
        }}
        rootClassName="w-16 h-16"
        icon={<MessageOutlined size={32} />}
      >
        <div
          id="chatbot"
          className="absolute -bottom-2 right-0 w-[350px] h-[430px] bg-white shadow-lg z-50"
        >
          <iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/7f469ad1-1124-4494-a37c-be9b0c43e988"
            title="Dialogflow Chatbot"
          ></iframe>
        </div>
      </FloatButton.Group>
    </div>
  );
};

export default Chatbot;

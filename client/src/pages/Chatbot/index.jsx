import React, { useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        id="chatbotIcon"
        className="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50"
        onClick={toggleChatbot}
      >
        <MessageOutlined style={{ fontSize: '24px', color: '#fff' }} />
      </div>
      {isOpen && (
        <div
          id="chatbot"
          className="fixed bottom-4 right-4 w-[350px] h-[430px] bg-white shadow-lg z-50"
        >
          <iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/7f469ad1-1124-4494-a37c-be9b0c43e988"
            title="Dialogflow Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

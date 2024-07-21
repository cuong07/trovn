import { SidebarChat } from "@/components";
import { useNavigate } from "react-router-dom";

const ChatMobile = () => {
    const navigate = useNavigate();
    const handleClickChat = (id) => {
        navigate(`/message/${id}`);
    };
    return (
        <div
            style={{
                height: "calc(100vh - 160px)",
            }}
            className="overflow-hidden"
        >
            <SidebarChat handleClickChat={handleClickChat} />
        </div>
    );
};

export default ChatMobile;

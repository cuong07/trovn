import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import ChatDesktop from "./ChatDesktop";
import { getConversations } from "@/apis/conversation";
import { message } from "antd";
import ChatMobile from "./ChatMobile";

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { success } = await getConversations();
                setIsLoading(false);
                if (!success) {
                    return message.error("Vui lòng đăng nhập");
                }
            } catch (error) {
                console.log(error);
                message.error(error.message);
            }
        })();
    }, []);

    return (
        <div className="h-full overflow-hidden">
            <MediaQuery minWidth={992}>
                <ChatDesktop isLoading={isLoading} />
            </MediaQuery>
            <MediaQuery maxWidth={991}>
                <ChatMobile isLoading={isLoading} />
            </MediaQuery>
        </div>
    );
};

export default Index;

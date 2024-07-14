import { useEffect } from "react";
import useUserStore from "../../hooks/useUserStore";
import useConversationStore from "../../hooks/useConversationStore";

const Index = () => {
    const { user, socketConnection } = useUserStore();
    const { setConversations } = useConversationStore();

    useEffect(() => {
        if (socketConnection && user) {
            socketConnection.emit("sidebar", user.id);
            socketConnection.on("conversation", (data) => {
                setConversations(data);
            });
        }
    }, [setConversations, socketConnection, user]);

    return <div></div>;
};

export default Index;

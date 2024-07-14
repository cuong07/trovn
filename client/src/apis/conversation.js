import { ConversationV1 } from "@/constants/endpoints";
import useUserStore from "@/hooks/useUserStore";
import qs from "query-string";
import { apiClient } from "./apiClient";
import useConversationStore from "@/hooks/useConversationStore";

export const getConversations = async () => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) {
        return { success: false, message: "Vui lòng đăng nhập" };
    }
    const url = qs.stringifyUrl({
        url: ConversationV1.GET_CONVERSATIONS,
        query: {
            id: userId,
        },
    });

    const { data } = await apiClient.get(url);
    useConversationStore.setState((prev) => {
        const conversationUserData = data?.data?.map((conversationUser) => {
            if (
                conversationUser?.sender?.id === conversationUser?.receiver?.id
            ) {
                return {
                    ...conversationUser,
                    userDetails: conversationUser?.sender,
                };
            } else if (conversationUser?.receiver?.id !== userId) {
                return {
                    ...conversationUser,
                    userDetails: conversationUser.receiver,
                };
            } else {
                return {
                    ...conversationUser,
                    userDetails: conversationUser.sender,
                };
            }
        });

        return {
            ...prev,
            conversations: conversationUserData,
        };
    });
    return data;
};

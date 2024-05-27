import { create } from "zustand";
import useUserStore from "./userStore";

const useConversationStore = create((set) => ({
  conversations: [],

  setConversations: (data) => {
    set((state) => {
      const conversationUserData = data?.map((conversationUser) => {
        if (conversationUser?.sender?.id === conversationUser?.receiver?.id) {
          return {
            ...conversationUser,
            userDetails: conversationUser?.sender,
          };
        } else if (
          conversationUser?.receiver?.id !== useUserStore.getState().user?.id
        ) {
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
        ...state,
        conversations: conversationUserData,
      };
    });
  },
}));

export default useConversationStore;

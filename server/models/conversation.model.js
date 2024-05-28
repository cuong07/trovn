import db from "../lib/db.js";

const UserModel = {
  methods: {
    async getConversations(currentUserId) {
      console.log(currentUserId);
      const currentUserConversation = await db.conversation.findMany({
        where: {
          OR: [{ userOneId: currentUserId }, { userTwoId: currentUserId }],
        },
        include: {
          messages: true,
          userOne: true,
          userTwo: true,
        },
      });
      const conversation = currentUserConversation.map((conv) => {
        return {
          id: conv?.id,
          sender: conv?.userTwo,
          receiver: conv?.userOne,
          lastMsg: conv.messages[conv?.messages?.length - 1],
        };
      });
      return conversation;
    },

    async getConversationMessage(senderId, receiverId) {
      return await db.conversation.findFirst({
        where: {
          OR: [
            { userOneId: senderId, userTwoId: receiverId },
            { userOneId: receiverId, userTwoId: senderId },
          ],
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    },

    async createConversation(sender, receiver) {
      return await db.conversation.create({
        data: {
          userOneId: sender,
          userTwoId: receiver,
        },
      });
    },
  },
};

export default UserModel;

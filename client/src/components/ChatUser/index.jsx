/* eslint-disable react/prop-types */
import { Avatar, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/utils/helpers";
import moment from "moment";
import { BiCheckShield } from "react-icons/bi";
import { ROLE } from "@/constants/role";

const Index = ({ conversation, user, handleClickChat }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleClick = () => {
        if (!handleClickChat) {
            navigate(`/chat/${conversation?.userDetails?.id}`);
        } else {
            handleClickChat(conversation?.userDetails?.id);
        }
    };

    return (
        <div
            className={cn(
                "flex items-center py-4 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer",
                conversation.userDetails?.id === id ? "bg-slate-100" : ""
            )}
            onClick={handleClick}
        >
            <Flex align="center" justify="space-between" className="w-full">
                <div className="flex items-center  gap-2 ">
                    <div>
                        <Avatar
                            src={conversation?.userDetails?.avatarUrl}
                            alt={conversation?.userDetails?.username}
                            className="object-cover size-14"
                        />
                    </div>
                    <div>
                        <h3 className="text-ellipsis line-clamp-1 flex gap-2 font-semibold text-lg">
                            {conversation?.userDetails?.fullName ||
                                conversation?.userDetails?.username}
                            {conversation?.userDetails?.role === ROLE.ADMIN && (
                                <BiCheckShield size={22} color="#0866FF" />
                            )}
                        </h3>
                        <div className="text-slate-500 text-xs flex items-center gap-1">
                            <p className="text-ellipsis line-clamp-1 leading-5">
                                {user?.id == conversation?.lastMsg?.userId
                                    ? `Tôi: ${conversation?.lastMsg?.content}`
                                    : conversation?.lastMsg?.content}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    {moment(conversation?.updatedAt)
                        .startOf("second")
                        .fromNow()}
                </div>
            </Flex>
        </div>
    );
};

export default Index;

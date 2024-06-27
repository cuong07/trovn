/* eslint-disable react/prop-types */
import { Avatar, Flex } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/utils/helpers";
import moment from "moment";

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
        // <NavLink
        //     to={conversation?.userDetails?.id}
        //     className="hover:text-black"
        // >
        <div
            className={cn(
                "flex items-center py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer",
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
                            size="large"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                            {conversation?.userDetails?.username}
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
        // </NavLink>
    );
};

export default Index;

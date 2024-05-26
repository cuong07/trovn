/* eslint-disable react/prop-types */
import { Avatar } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { cn } from "../../utils/helpers";

const Index = ({ conversation, user }) => {
  const { id } = useParams();
  return (
    <NavLink
      to={conversation?.userDetails?.id}
      key={conversation?.id}
      className={cn(
        "flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer",
        conversation.userDetails?.id === id ? "bg-slate-100" : ""
      )}
    >
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
          <div className="flex items-center gap-1">
            {/* {conversation?.lastMsg?.imageUrl && (
              <div className="flex items-center gap-1">
                <span>
                  <FaImage />
                </span>
                {!conversation?.lastMsg?.text && <span>Image</span>}
              </div>
            )}
            {conversation?.lastMsg?.videoUrl && (
              <div className="flex items-center gap-1">
                <span>
                  <FaVideo />
                </span>
                {!conversation?.lastMsg?.text && <span>Video</span>}
              </div>
            )} */}
          </div>
          <p className="text-ellipsis line-clamp-1 leading-5">
            {user?.id == conversation?.lastMsg?.userId
              ? `Tôi: ${conversation?.lastMsg?.content}`
              : conversation?.lastMsg?.content}
          </p>
        </div>
      </div>
      {Boolean(conversation?.unseenMsg) && (
        <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
          {conversation?.unseenMsg}
        </p>
      )}
    </NavLink>
  );
};

export default Index;

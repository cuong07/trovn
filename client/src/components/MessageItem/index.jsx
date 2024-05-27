/* eslint-disable react/prop-types */
import moment from "moment";
import { BiCheckboxChecked } from "react-icons/bi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const Index = ({ message, meId }) => {
  return (
    <div
      key={message.id}
      className={`px-4 py-2 border  rounded-t-xl w-fit max-w-[280px] shadow-lg md:max-w-sm  lg:max-w-md ${
        meId === message?.userId
          ? "ml-auto bg-[#175BC0]  rounded-bl-xl text-white"
          : "bg-white  rounded-br-xl"
      }`}
    >
      <p className="">{message.content}</p>
      <div className="flex justify-between gap-2">
        <p
          className={`w-fit text-[10px] ${
            meId === message?.userId ? "ml-auto" : "mr-auto"
          }`}
        >
          {moment(message.createdAt).format("hh:mm")}
        </p>
        {message?.isSeen && (
          <p>
            <IoCheckmarkDoneOutline />
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;

/* eslint-disable react/prop-types */
import moment from "moment";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const Index = ({ message, meId }) => {
    return (
        <div>
            <p
                className={`w-fit text-[12px] font-medium flex items-center gap-2 ${
                    meId === message?.userId ? "ml-auto" : "mr-auto"
                }`}
            >
                {moment(message.createdAt).format("hh:mm")}
                <span>
                    {message?.isSeen && (
                        <p>
                            <IoCheckmarkDoneOutline />
                        </p>
                    )}
                </span>
            </p>
            <div
                key={message.id}
                className={`p-4 border  rounded-t-xl w-fit max-w-[280px] shadow-md md:max-w-sm  lg:max-w-md ${
                    meId === message?.userId
                        ? "ml-auto bg-[#175BC0]  rounded-bl-xl text-white"
                        : "bg-white  rounded-br-xl"
                }`}
            >
                <p className="">{message.content}</p>
            </div>
        </div>
    );
};

export default Index;

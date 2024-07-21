/* eslint-disable react/prop-types */
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import moment from "moment";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

const Index = ({ message, meId }) => {
    const formatMessage = (message) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return reactStringReplace(message, urlRegex, (match, i) => (
            <span key={i}>
                <a
                    href={match}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {match}
                </a>
                <LinkPreview
                    url="https://google.com"
                    width="300px"
                    fallbackImageSrc="https://www.aljazeera.com/wp-content/uploads/2021/08/2019-12-07T000000Z_879038429_RC2LQD9L67FQ_RTRMADP_3_SOCCER-SPAIN-FCB-RCD-REPORT.jpg?resize=770%2C513"
                />
            </span>
        ));
    };
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
                className={`p-4 border rounded-t-xl  w-fit h-auto max-w-[400px] shadow-md md:max-w-sm lg:max-w-4xl ${
                    meId === message?.userId
                        ? "ml-auto bg-[#175BC0] rounded-bl-xl text-white"
                        : "bg-white rounded-br-xl"
                }`}
            >
                <div className="">{formatMessage(message.content)}</div>
            </div>
        </div>
    );
};

export default Index;

import reactStringReplace from "react-string-replace";

const formatMessage = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return reactStringReplace(message, urlRegex, (match, i) => (
        <Link
            key={i}
            href={match}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
        >
            {match}
        </Link>
    ));
};

export default formatMessage;

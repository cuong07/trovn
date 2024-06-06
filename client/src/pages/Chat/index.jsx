import React, { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import ChatDesktop from "./ChatDesktop";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/hooks/userStore";
import { getConversations } from "@/apis/conversation";
import { message } from "antd";
import { io } from "socket.io-client";
import ChatMobile from "./ChatMobile";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const Index = () => {
    const { setOnlineUser, setSocketConnection } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const TOKEN = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        if (!TOKEN) {
            return;
        }
        const socketConnection = io(BACKEND_URL, {
            auth: {
                token: `Bearer ${TOKEN}`,
            },
            // query: {
            //   token: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            // },
            timeout: 16000,
        });
        socketConnection.on("connection", () => {
            console.log("Connected to server");
        });
        socketConnection.on("onlineUser", (data) => {
            setOnlineUser(data);
        });

        setSocketConnection(socketConnection);

        return () => {
            socketConnection.disconnect();
        };
    }, [TOKEN, setOnlineUser, setSocketConnection]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { success } = await getConversations();
                setIsLoading(false);
                if (!success) {
                    return message.error("Vui lòng đăng nhập");
                }
            } catch (error) {
                console.log(error);
                message.error(error.message);
            }
        })();
    }, []);

    if (!TOKEN) {
        return navigate("/");
    }
    return (
        <div className="h-full overflow-hidden">
            <MediaQuery minWidth={992}>
                <ChatDesktop isLoading={isLoading} />
            </MediaQuery>
            <MediaQuery maxWidth={991}>
                <ChatMobile isLoading={isLoading} />
            </MediaQuery>
        </div>
    );
};

export default Index;

import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useUserStore from "./hooks/userStore";
import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./routes/routes";
import useConversationStore from "./hooks/useConversationStore";
import { notification } from "antd";
import { BiMessageAltDetail } from "react-icons/bi";
import { isEmpty } from "lodash";
import { updateLatLngUser } from "./apis/user";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

function App() {
    const TOKEN = JSON.parse(localStorage.getItem("token"));
    const { user, setOnlineUser, setSocketConnection } = useUserStore();
    const [api, contextHolder] = notification.useNotification();
    const { setUser } = useUserStore();
    // const { pathname } = useLocation();
    const { setUnreadMessagesCount, unreadMessagesCount } =
        useConversationStore();
    useEffect(() => {
        if (!TOKEN) return;

        const socketInstance = io(BACKEND_URL, {
            auth: {
                token: `Bearer ${TOKEN}`,
            },
            timeout: 16000,
        });

        setSocketConnection(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to server");
        });

        socketInstance.on("onlineUser", (data) => {
            setOnlineUser(data);
        });

        if (user && user.id) {
            socketInstance.emit("unreadMessagesCount", user.id);
        }

        socketInstance.on("unreadMessagesCount", (count) => {
            console.log("Unread messages:", count);
            setUnreadMessagesCount(count);
        });

        socketInstance.on("newMessageNotification", ({ senderName, text }) => {
            // if (!pathname.includes("/chat")) {
            playNotificationSound();
            api.open({
                message: (
                    <div className="text-xs">
                        {`Bạn nhận được tin nhắn mới từ `}
                        <strong>{senderName}</strong>
                    </div>
                ),
                description: text,
                icon: <BiMessageAltDetail />,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            // }

            // setNotifications((prevNotifications) => [
            //     ...prevNotifications,
            //     `Bạn nhận được tin nhắn mới từ ${senderName}: ${text}`,
            // ]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [
        TOKEN,
        api,
        setOnlineUser,
        setSocketConnection,
        setUnreadMessagesCount,
        user,
    ]);

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });

    const [error, setError] = useState(null);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setError(null);
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        (async () => {
            if (!user.latitude) {
                handleGetLocation();
                const { data, success } = await updateLatLngUser(
                    parseFloat(location.latitude),
                    parseFloat(location.longitude)
                );
                if (success) {
                    setUser(data);
                }
            }
        })();
    }, [location.latitude, location.longitude, setUser, user]);

    const playNotificationSound = () => {
        const audio = new Audio("/message.mp3");
        audio.play();
    };

    return (
        <>
            {contextHolder}
            <RouterProvider router={router} />
        </>
    );
}

export default App;

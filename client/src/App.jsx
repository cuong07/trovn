import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useUserStore from "./hooks/userStore";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import useConversationStore from "./hooks/useConversationStore";
import { notification } from "antd";
import { BiMessageAltDetail } from "react-icons/bi";
import { updateLatLngUser } from "./apis/user";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const TOKEN = JSON.parse(localStorage.getItem("token"));

function App() {
    const { user, setOnlineUser, setSocketConnection, setUser } =
        useUserStore();
    const { setUnreadMessagesCount } = useConversationStore();
    const [api, contextHolder] = notification.useNotification();

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });

    const [error, setError] = useState(null);

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

    useEffect(() => {
        const updateLocation = async () => {
            if (
                location.latitude !== null &&
                location.longitude !== null &&
                user?.latitude === null
            ) {
                const { data, success } = await updateLatLngUser(
                    location.latitude,
                    location.longitude
                );
                if (success) {
                    setUser(data);
                }
            }
        };
        updateLocation();
    }, [location.latitude, location.longitude, user, setUser]);

    const handleGetLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
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
    }, []);

    useEffect(() => {
        if (user?.latitude === null && user?.longitude === null) {
            handleGetLocation();
        }
    }, [user, handleGetLocation]);

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

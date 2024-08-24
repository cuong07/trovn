import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

import App from "@/App";
import "@/index.css";
import { ModalProvider } from "./providers/ModalProvider";
import { Toaster } from 'sonner'
ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider
        theme={{
            token: {
                fontFamily: '"Roboto", sans-serif',
                borderRadius: 8,
                fontWeightStrong: 500,
                colorText: "#222",
                colorPrimary: "#50C878",
            },
        }}
    >
        <Toaster/>
        <ModalProvider />
        <App />
    </ConfigProvider>
);

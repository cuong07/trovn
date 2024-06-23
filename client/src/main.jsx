import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";

import { router } from "@/routes/routes.jsx";
import "@/index.css";
import App from "./App";

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
        <App />
    </ConfigProvider>
);

import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

import App from "./App";
import "./index.css";

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

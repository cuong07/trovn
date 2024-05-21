import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes.jsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: '"Roboto", sans-serif',
        borderRadius: 6,
        colorText: "#222",
        colorPrimary: "#E51D55",
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);

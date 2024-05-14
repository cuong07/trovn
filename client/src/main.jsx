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
        borderRadius: 2,
        colorPrimary: '#8343EB', // Set the primary color
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
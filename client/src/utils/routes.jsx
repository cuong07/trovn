import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/Layout/MainLayout";
import EmptyLayout from "../pages/Layout/EmptyLayout"
import Register from "../pages/Register"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <EmptyLayout />,
    children: [
      {
        path: "register",
        element: <Register/>,
      },
    ],
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "app",
        element: <h1>Main layout App</h1>,
      },
    ],
  },
]);

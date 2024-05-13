import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/Layout/MainLayout";
import EmptyLayout from "../pages/Layout/EmptyLayout"
import Register from "../pages/Register"
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "",
    element: <EmptyLayout />,
    children: [
      {
        path: "/register",
        element: <Register/>,
      },{ 
        path: "/login",
        element: <Login />
      },
      { 
        path: "/",
        element: <MainLayout/>
      }
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

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/Layout/MainLayout";
import EmptyLayout from "../pages/Layout/EmptyLayout"
import Register from "../pages/Register"
export const router = createBrowserRouter([
  {
    path: "",
    element: <EmptyLayout />,
    children: [
      {
        path: "/register",
        element: <Register/>,
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

  {
    path: "/login",
    element: <LoginForm />,
    children: [
      {
        path: "app",
        element: <h1>element of Login form</h1>,
      },
    ],
  },
]);

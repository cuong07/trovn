import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/MainLayout";
import LoginForm from "../pages/Login/index.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "app",
        element: <h1>App layout</h1>,
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

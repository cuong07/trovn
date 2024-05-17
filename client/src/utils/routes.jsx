import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../pages/Layout/MainLayout";
// import EmptyLayout from "../pages/Layout/EmptyLayout";
// import Register from "../pages/Register";
// import Login from "../pages/Login";

import {
  AdminLayout,
  EmptyLayout,
  Home,
  Listing,
  MainLayout,
  Register,
  Search,
  HostLayout,
  Login,
  Profile,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "",
    element: <EmptyLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "/listing/:id", element: <Listing /> },
          { path: "/search", element: <Search /> },
          { path: "/user/:id", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "app",
        element: <h1>Main layout App</h1>,
      },
    ],
  },
  
  {
    path: "/host",
    element: <HostLayout />,
    children: [
      {
        path: "app",
        element: <h1>Main layout App</h1>,
      },
    ],
  },
]);

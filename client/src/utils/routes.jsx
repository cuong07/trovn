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
  Info,
  Forgetpass,
  Newpass,
  Chatbot,
} from "../pages";
import { ListingCreate, ListingList } from "../pages/Host";

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
        path: "/chatbot",
        element: <Chatbot />,
      },
      {
        path: "/forgetpass",
        element: <Forgetpass />,
      },
      {
        path: "/newpass",
        element: <Newpass />,
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "/listing/:id", element: <Listing /> },
          { path: "/search", element: <Search /> },
          { path: "/user/info", element: <Info /> },
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
        path: "listing",
        element: <EmptyLayout />,
        children: [
          {
            path: "list",
            element: <ListingList />,
          },
          {
            path: "create",
            element: <ListingCreate />,
          },
        ],
      },
    ],
  },
]);

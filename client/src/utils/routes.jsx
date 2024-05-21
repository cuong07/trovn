import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../pages/Layout/MainLayout";
// import EmptyLayout from "../pages/Layout/EmptyLayout";
// import Register from "../pages/Register";
import Login from "../pages/Login";

import {
  AdminLayout,
  EmptyLayout,
  Home,
  Listing,
  MainLayout,
  Register,
  Search,
  HostLayout,
  Services,
  Checkout,
  AdvertiseManager,
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
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "/listing/:id", element: <Listing /> },
          { path: "/search", element: <Search /> },
          { path: "/checkout", element: <Checkout /> },
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
        path: "",
        element: <Services />,
      },
      {
        path: "ads-package",
        element: <AdvertiseManager />,
      },
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

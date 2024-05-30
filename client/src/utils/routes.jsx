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
  Services,
  Checkout,
  AdvertiseManager,
  Login,
  Info,
  Forgetpass,
  Newpass,
  Chatbot,
  Chat,
  Welcome,
  Favorite,
  NewInfo,
  Logout,
} from "@/pages";
import { ListingCreate, ListingList } from "@/pages/Host";
import {
  Amenities,
  Banners,
  Dashboard,
  Listings,
  Locations,
  Payments,
  Users,
} from "@/pages/Admin";
import { MessagePage } from "@/components";

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
        path: "/logout",
        element: <Logout />,
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
          { path: "/checkout", element: <Checkout /> },
          // { path: "/user/info", element: <NewInfo /> },
          {
            path: "/chat",
            element: <Chat />,
            children: [
              {
                path: "",
                element: <Welcome />,
              },
              { path: ":id", element: <MessagePage /> },
            ],
          },
          { path: "/user/info/:id", element: <Info /> },
          { path: "/user/new-info/:id", element: <NewInfo /> },
          { path: "/favorite", element: <Favorite /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "listings",
        element: <Listings />,
      },
      {
        path: "banners",
        element: <Banners />,
      },
      {
        path: "locations",
        element: <Locations />,
      },
      {
        path: "amenities",
        element: <Amenities />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "messages",
        element: <Chat />,
        children: [
          {
            path: "",
            element: <Welcome />,
          },
          { path: ":id", element: <MessagePage /> },
        ],
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

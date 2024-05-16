import { createBrowserRouter } from "react-router-dom";
import {
  AdminLayout,
  EmptyLayout,
  Home,
  Listing,
  MainLayout,
  Register,
  Search,
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
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "/listing/:id", element: <Listing /> },
          { path: "/search", element: <Search /> },
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
]);

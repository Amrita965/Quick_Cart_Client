import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import DashboardStatus from "../Pages/UserDashboard/DashboardStatus";
import Customer from "../Pages/UserDashboard/Customer/Customer";
import PrivateRoute from "./PrivateRoute";
import Category from "../Pages/UserDashboard/Category/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/status",
        element: <DashboardStatus />,
      },
      {
        path: "/dashboard/customer",
        element: <Customer />,
      },
      {
        path: "/dashboard/category",
        element: <Category />
      }
    ],
  },
]);

export default router;

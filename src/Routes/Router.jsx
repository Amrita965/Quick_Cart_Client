import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import DashboardStatus from "../Pages/UserDashboard/DashboardStatus";
import Customer from "../Pages/UserDashboard/Customer/Customer";
import PrivateRoute from "./PrivateRoute";
import Category from "../Pages/UserDashboard/Category/Category";
import UserProfile from "../Pages/UserDashboard/UserProfile/UserProfile";
import Product from "../Pages/UserDashboard/Product/Product";
import CreateSale from "../Pages/UserDashboard/CreateSale/CreateSale";

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
        path: "/dashboard/customers",
        element: <Customer />,
      },
      {
        path: "/dashboard/categories",
        element: <Category />
      },
      {
        path: "/dashboard/products",
        element: <Product />
      },
      {
        path: "/dashboard/profile",
        element: <UserProfile />
      },
      {
        path: "/dashboard/create-sale",
        element: <CreateSale />
      }
    ],
  },
]);

export default router;

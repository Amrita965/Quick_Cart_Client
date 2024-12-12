import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import DashboardStatus from "../Pages/UserDashboard/DashboardStatus";
import Customer from "../Pages/UserDashboard/Customer/Customer";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <UserDashboardLayout />,
        children: [
            {
                path: "/dashboard/status",
                element: <DashboardStatus />
            },
            {
                path: "/dashboard/customer",
                element: <Customer />
            }
        ]
    }
]);

export default router;
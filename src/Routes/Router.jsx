import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import DashboardStatus from "../Pages/UserDashboard/DashboardStatus";

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
                path: "/dashboard",
                element: <DashboardStatus />
            }
        ]
    }
]);

export default router;
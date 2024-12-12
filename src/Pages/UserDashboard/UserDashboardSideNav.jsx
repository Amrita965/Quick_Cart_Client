import { NavLink, Outlet } from "react-router-dom";

const UserDashboardSideNav = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="user-dashboard-sidenav" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet />
      </div>
      <div className="drawer-side shadow-md">
        <label
          htmlFor="user-dashboard-sidenav"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-white text-base-content min-h-full w-72 py-0 lg:py-2 px-0">
          {/* Sidebar content here */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "rounded-none bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-4 border-l-4 border-slate-500"
                  : "rounded-none px-5 py-4 border-l-4 hover:border-slate-500"
              }
            >
              <i className="fa-solid fa-chart-line"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer"
              className={({ isActive }) =>
                isActive
                  ? "rounded-none bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-4 border-l-4 border-slate-500"
                  : "rounded-none px-5 py-4 border-l-4 hover:border-slate-500"
              }
            >
              <i className="fa-solid fa-users"></i>
              Customer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive
                  ? "rounded-none bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-4 border-l-4 border-slate-500"
                  : "rounded-none px-5 py-4 border-l-4 hover:border-slate-500"
              }
            >
              <i className="fa-solid fa-list"></i>
              Category
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "rounded-none bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-4 border-l-4 border-slate-500"
                  : "rounded-none px-5 py-4 border-l-4 hover:border-slate-500"
              }
            >
              <i className="fa-solid fa-bag-shopping"></i> Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-sale"
              className={({ isActive }) =>
                isActive
                  ? "rounded-none bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-4 border-l-4 border-slate-500"
                  : "rounded-none px-5 py-4 border-l-4 hover:border-slate-500"
              }
            >
              <i className="fa-regular fa-credit-card"></i>
              Create Sale
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                isActive
                  ? "rounded-none bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-4 border-l-4 border-slate-500"
                  : "rounded-none px-5 py-4 border-l-4 hover:border-slate-500"
              }
            >
              <i className="fa-solid fa-file-invoice"></i>
              Invoice
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                isActive
                  ? "rounded-none bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-4 border-l-4 border-slate-500"
                  : "rounded-none px-5 py-4 border-l-4 hover:border-slate-500"
              }
            >
              <i className="fa-solid fa-chart-simple"></i>
              Report
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboardSideNav;

import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/quick-cart-logo.png";
import UserAuthenticationDrawer from "./UserAuthenticationDrawer";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import StartToastifyInstance from "toastify-js";
import Toastify from "toastify-js";
import { updateUserStatus } from "../../utilities/updateUserStatus";
import { errorToast, successToast } from "../../utilities/toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        successToast("Logout successfull");
      })
      .catch((error) => {
        errorToast(error.message);
      });

      updateUserStatus("offline", user);
  };

  const navlinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/about"
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/company"
        >
          Company
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/services"
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/services"
        >
          Testimonials
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <nav className="shadow-md fixed w-full z-50 top-0 left-0">
        <div className="navbar justify-between p-3 bg-base-100 max-w-screen-xl mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
              >
                {navlinks}
              </ul>
            </div>
            <Link to="/" className="flex items-center gap-1">
              <img className="w-14" src={logo} alt="" />
              <h1 className="text-xl md:text-3xl font-semibold">Quick Cart</h1>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">{navlinks}</ul>
          </div>
          <div className="navbar-end">
            {!user?.emailVerified ? (
              <label
                htmlFor="user-authentication-drawer"
                className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
              >
                START SALE
              </label>
            ) : (
              <div className="dropdown dropdown-end rounded-none">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  {user?.photoURL ? (
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  ) : (
                    <div className="avatar placeholder mr">
                      <div className="bg-neutral text-neutral-content w-11 rounded-full">
                        <span className="text-lg">
                          {user?.displayName?.at(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-80 p-2 shadow-lg rounded-md"
                >
                  <div className="flex flex-row items-center gap-3 p-2">
                    <div>
                      {user?.photoURL ? (
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src={user?.photoURL}
                          />
                        </div>
                      ) : (
                        <div className="avatar placeholder mr hover:bg-inherit">
                          <div className="bg-neutral text-neutral-content w-11 rounded-full">
                            <span className="text-lg">
                              {user?.displayName?.at(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-0">
                      <h4 className="font-semibold text-base">
                        {user?.displayName}
                      </h4>
                      <p className="block">{user.email}</p>
                    </div>
                  </div>
                  <ul className="mt-3">
                    <li>
                      <Link className="justify-between">
                        Profile
                        <span className="badge bg-success text-white">New</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/status">Dashborad</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {!user?.emailVerified && <UserAuthenticationDrawer />}
    </>
  );
};

export default Navbar;

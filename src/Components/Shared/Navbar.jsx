import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/quick-cart-logo.png";

const Navbar = () => {
  const navlinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive && "active")}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => isActive && "active"} to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => isActive && "active"}
          to="/company"
        >
          Company
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => isActive && "active"}
          to="/services"
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => isActive && "active"}
          to="/services"
        >
          Testimonials
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="shadow-md">
      <div className="navbar p-3 bg-base-100 max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            <h1 className="text-3xl font-medium">Quick Cart</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">{navlinks}</ul>
        </div>
        <div className="navbar-end">
          <Link className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
            START SALE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import logo from "../../assets/logo/quick-cart-logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { updateUserStatus } from "../../utilities/updateUserStatus";
import { errorToast, successToast } from "../../utilities/toast";

const UserDashboardTopNav = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        successToast("Logout successful");
      })
      .catch((error) => {
        errorToast(error.message);
      });
    updateUserStatus("offline", user);
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg border">
      <div className="flex-1 flex items-center gap-5">
        <label
          htmlFor="user-dashboard-sidenav"
          className="btn btn-circle swap swap-rotate drawer-button lg:hidden "
        >
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        <Link to="/" className="flex items-center">
          <img className="w-14" src={logo} alt="" />
          <h2 className="text-2xl font-semibold">Quick Cart</h2>
        </Link>
      </div>
      <div className="flex-none gap-3">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-52"
          />
        </div> */}
        <div className="navbar-end">
          {user?.uid && (
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
                    <Link>Dashborad</Link>
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
  );
};

export default UserDashboardTopNav;

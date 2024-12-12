import { useState } from "react";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

const UserAuthenticationDrawer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="drawer drawer-end relative z-50">
      <input
        id="user-authentication-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-side">
        <label
          htmlFor="user-authentication-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-full md:w-[500px] flex items-center justify-center">
          <label
            htmlFor="user-authentication-drawer"
            aria-label="close sidebar"
            className="btn btn-circle absolute top-3 left-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
          <div className="w-full md:p-7">
            {isLogin ? (
              <Login setIsLogin={setIsLogin} />
            ) : (
              <SignUp setIsLogin={setIsLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthenticationDrawer;

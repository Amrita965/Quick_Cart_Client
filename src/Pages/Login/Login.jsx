import { useContext } from "react";
import user from "../../assets/icons/user.png";
import { AuthContext } from "../../Contexts/AuthProvider";
import EmailVerificationModal from "./EmailVerificationModal";
import { updateUserStatus } from "../../utilities/updateUserStatus";
import { errorToast, successToast } from "../../utilities/toast";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogin }) => {
  const { isLoading, setIsLoading, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        document.getElementById("email-verfication-modal").showModal();
        setIsLoading(false);
        return;
      }
      updateUserStatus("active", user);
      successToast("Successfully Logged In");
      form.reset();
      navigate("/dashboard/status");
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error.message;
      errorToast(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 md:p-6 shadow-sm rounded-lg">
        <img className="w-16 mx-auto" src={user} alt="" />
        <h2 className="text-2xl font-semibold text-center mt-2">Log In</h2>
        <hr className="my-5" />
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            required
            name="email"
            type="text"
            placeholder="Email"
            className="input input-bordered input-secondary w-full"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered input-secondary w-full"
          />
          <button className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
            {isLoading && (
              <span className="loading loading-spinner loading-md"></span>
            )}{" "}
            LOG IN
          </button>
        </form>
        <p className="mt-5 text-center font-medium">
          Dont't have an account?{" "}
          <button
            onClick={() => setIsLogin(false)}
            className="btn-link bg-gradient-to-r from-fuchsia-600 to-pink-600  bg-clip-text text-transparent"
          >
            SignUp
          </button>
        </p>
      </div>
      <EmailVerificationModal />
    </>
  );
};

export default Login;

import { useContext } from "react";
import user from "../../assets/icons/user.png";
import { AuthContext } from "../../Contexts/AuthProvider";
import { errorToast, successToast } from "../../utilities/toast";

const SignUp = ({ setIsLogin }) => {
  const {
    createUser,
    isLoading,
    setIsLoading,
    sendVerficationEmail,
    logout,
    updateUserProfile,
  } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const fullname = form.fullname.value;
    const email = form.email.value;
    const password = form.password.value;
    const confPassword = form.confpassword.value;

    if (password !== confPassword) {
      errorToast("Password and Confirm Password do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      await logout();
      await updateUserProfile(user, fullname); 

      const userInfo = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo_URL: user.photoURL
          ? user.photoURL
          : "https://i.postimg.cc/pdDQYy1w/307ce493-b254-4b2d-8ba4-d12c080d6651-prev-ui.png",
        role: "user",
        status: "pending",
      };

      const res = await fetch("http://localhost:8000/users/", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();


      verifyEmail(user);
      form.reset();
    } catch (error) {
      errorToast(error.message);
      setIsLoading(false);
    }
  };

  const verifyEmail = async (currentUser) => {
    try {
      await sendVerficationEmail(currentUser);
      successToast("A verification link sent to your email address. After verification, you have to log in.");
      setIsLoading(false);
      setIsLogin(true);
    } catch (error) {
      errorToast(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 shadow-sm rounded-lg">
      <img className="w-16 mx-auto" src={user} alt="" />
      <h2 className="text-2xl font-semibold text-center mt-2">SignUp</h2>
      <hr className="my-5" />
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <input
          name="fullname"
          required
          type="text"
          placeholder="Fullname"
          className="input input-bordered input-secondary w-full"
        />
        <input
          name="email"
          required
          type="text"
          placeholder="Email"
          className="input input-bordered input-secondary w-full"
        />
        <input
          name="password"
          required
          type="password"
          placeholder="Password"
          minLength="6"
          className="input input-bordered input-secondary w-full"
        />
        <input
          name="confpassword"
          required
          type="password"
          placeholder="Confirm Password"
          minLength="6"
          className="input input-bordered input-secondary w-full"
        />
        <button className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
          {isLoading && (
            <span className="loading loading-spinner loading-md"></span>
          )}{" "}
          SIGN UP
        </button>
      </form>
      <p className="mt-5 text-center font-medium">
        Already have an account?{" "}
        <button
          onClick={() => setIsLogin(true)}
          className="btn-link bg-gradient-to-r from-fuchsia-600 to-pink-600  bg-clip-text text-transparent"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUp;

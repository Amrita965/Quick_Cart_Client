import { useContext, useState } from "react";
import emailVerificationIcon from "../../assets/icons/email-verification-icon.png";
import { AuthContext } from "../../Contexts/AuthProvider";
import { errorToast, successToast } from "../../utilities/toast";

const EmailVerificationModal = ({ email }) => {
  const { sendVerficationEmail, auth, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);


  const handleRendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      await sendVerficationEmail(auth.currentUser);
      successToast("A new verification link has been sent to your email.");
      await logout();
      setIsLoading(false);
      document.getElementById("email-verfication-modal").close();
    } catch (error) {
      errorToast(error.message);
    }
    setIsLoading(false);
  };

  return (
    <dialog id="email-verfication-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl text-center">Verify Your Email</h3>
        <div className="mt-5">
          <img className="w-16 mx-auto" src={emailVerificationIcon} alt="" />
          <p className="py-4 text-center">
            Please verify your email address by clicking the link send to{" "}
            <span className="font-semibold text-primary">
              {auth.currentUser?.email}
            </span>
          </p>
          <button
            onClick={handleRendVerificationEmail}
            className="btn btn-neutral mx-auto flex"
          >
            {isLoading && (
              <span className="loading loading-spinner loading-md"></span>
            )}{" "}
            Resend Verification Email
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EmailVerificationModal;

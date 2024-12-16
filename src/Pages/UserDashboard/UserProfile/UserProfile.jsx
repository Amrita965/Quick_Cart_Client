import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useCustomHookForm from "./../../../CustomHooks/useCustomHookForm";
import { errorToast } from "../../../utilities/toast";
import { convertToDateOnly } from "../../../utilities/dateTime";

const UserProfile = () => {
  const { user, updateUserProfile, setUpdatePhoto, setProgress } =
    useContext(AuthContext);

  const [formData, setFormData, handleInputChange] = useCustomHookForm({
    name: "",
  });

  const {
    isLoading,
    error,
    data: userInfo = null,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () =>
      fetch(`http://localhost:8000/users/${user.uid}`).then((res) =>
        res.json()
      ),
  });

  useEffect(() => {
    if (isLoading) {
      setProgress(50);
    } else {
      setProgress(100);
    }
    if (error) {
      errorToast(error.message);
    }
    if (userInfo) {
      setFormData(userInfo);
    }
  }, [isLoading, userInfo, error, setFormData, setProgress]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setProgress(25);

    if (file) {
      // For preview purposes
      //   const imageURL = URL.createObjectURL(file);
      //   setImage(imageURL);

      // Append the actual file to FormData
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          "https://api.imgbb.com/1/upload?key=2bca849f6f65e90a8e64dfaef112667f",
          {
            method: "POST",
            body: formData,
          }
        );
        setProgress(50);
        const data = await response.json();
        setProgress(75);
        console.log(data.data.url);
        await updateUserProfile(user, user.displayName, data.data.url);
        setUpdatePhoto((prev) => !prev);
        setProgress(100);
        // alert(`Uploaded image URL: ${data.data.url}`);
      } catch (error) {
        console.error("Error uploading to ImageBB:", error);
      }
    }
  };
  return (
    <section className="max-w-screen-sm bg-white m-3 md:my-10 md:mx-auto p-3 md:p-10 shadow-md">
      <div className="bg-white flex flex-col items-center justify-center rounded-lg">
        <h2 className="text-2xl font-semibold mb-5">MY PROFILE</h2>
        <div className="flex flex-col items-center relative">
          {user?.photoURL ? (
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-24 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-20 rounded-full">
                <span className="text-3xl">{user?.displayName?.at(0)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="relative mt-5">
          <label
            title="Click to upload"
            htmlFor="button2"
            className="cursor-pointer flex items-center gap-4 px-4 py-3 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
          >
            <div className="w-max relative">
              <img
                className="w-8"
                src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                alt="file upload icon"
                width="512"
                height="512"
              />
            </div>
            <div className="relative">
              <span className="block text-xs font-semibold relative text-blue-900 group-hover:text-blue-500">
                Upload Your Photo
              </span>
              <span className="mt-0.5 block text-sm text-gray-500">
                Max 2 MB
              </span>
            </div>
          </label>
          <input
            onChange={handleImageChange}
            className="hidden"
            type="file"
            name="button2"
            id="button2"
          />
        </div>
        <form className="w-full flex flex-col md:grid gap-5 mt-10" action="">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Name</span>
            </div>
            <input
              name="name"
              defaultValue={formData?.name}
              onChange={handleInputChange}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Email</span>
            </div>
            <input
              name="email"
              defaultValue={formData?.email}
              disabled
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Created At</span>
            </div>
            <input
              disabled
              defaultValue={
                formData?.created_at
                  ? convertToDateOnly(formData.created_at)
                  : ""
              }
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Updated At</span>
            </div>
            <input
              disabled
              defaultValue={
                formData?.updated_at
                  ? convertToDateOnly(formData.updated_at)
                  : ""
              }
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <button className="bg-gradient-to-r from-fuchsia-600 to-pink-600 btn text-white col-span-2">
            <i className="fa-solid fa-paper-plane"></i> SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;

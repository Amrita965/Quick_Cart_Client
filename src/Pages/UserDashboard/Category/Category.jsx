import { useContext, useEffect, useState } from "react";
import CustomModal from "../../../Components/UserDashboard/CustomModal";
import useCustomHookForm from "./../../../CustomHooks/useCustomHookForm";
import CategoryForm from "./CategoryForm";
import { errorToast, successToast } from "../../../utilities/toast";
import { AuthContext } from "./../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from './../../../Components/ConfirmationModal';

const Category = () => {
  const { user, setProgress } = useContext(AuthContext);
  const [formData, setFormData, handleInputChange] = useCustomHookForm({
    name: "",
  });
  const [title, setTitle] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState({});

  const {
    data: categories = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`http://localhost:8000/categories/${user.uid}`).then((res) =>
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
  }, [isLoading]);

  const handleCreate = () => {
    document.getElementById("custom-modal").showModal();
    setTitle("Create Category");
    setFormData({
      name: "",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(50);
    document.getElementById("custom-modal").close();
    formData.user = user.uid;
    console.log(formData);
    try {
      const res = await fetch("http://localhost:8000/categories", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 201) {
        successToast("Category created successfully");
        refetch();
        setProgress(100);
      
      }
    } catch (error) {
      const errorMessage = error.message;
      errorToast(errorMessage);
      setProgress(100);
    }
  };

  const handleDeleteCategory = async() => {
    document.getElementById("confirmation-modal").close();
    setProgress(50);
    try {
      const res = await fetch(`http://localhost:8000/categories/${deletingCategory.id}`, {
        method: "DELETE"
      })
      const data = await res.json();
      console.log(data);
      if(res.status === 200) {
        successToast(data.message);
        refetch();
        setProgress(100);
      }

    } catch(error) {
      errorToast(error.message);
      setProgress(100);
    }
  }

  return (
    <section className="bg-white m-3 md:m-7 p-3 md:p-10">
      <div className="flex gap-4 md:gap-0 flex-col md:flex-row items-center justify-between px-3">
        <h2 className="text-2xl font-semibold">Category</h2>

        <div className="flex gap-2 items-center">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <button
            onClick={handleCreate}
            className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
          >
            CREATE
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <th>{category.id}</th>
                <td>{category.name}</td>
                <td>
                  <button className="btn btn-outline btn-success mr-2">Edit</button>
                  <button onClick={() => {
                    document.getElementById("confirmation-modal").showModal();
                    setDeletingCategory(category);
                  }} className="btn btn-outline btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomModal title={title}>
        <CategoryForm
          isUpdate={isUpdate}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </CustomModal>
      <ConfirmationModal handleDelete={handleDeleteCategory}  />
    </section>
  );
};

export default Category;

import { useContext, useEffect, useState } from "react";
import CustomModal from "../../../Components/UserDashboard/CustomModal";
import useCustomHookForm from "./../../../CustomHooks/useCustomHookForm";
import CategoryForm from "./CategoryForm";
import { errorToast, successToast } from "../../../utilities/toast";
import { AuthContext } from "./../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "./../../../Components/ConfirmationModal";

const Category = () => {
  const { user, setProgress } = useContext(AuthContext);
  const [formData, setFormData, handleInputChange] = useCustomHookForm({
    name: "",
  });
  const [title, setTitle] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState({});
  const [searchText, setSearchText] = useState("");
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(total / itemsPerPage);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories", searchText, itemsPerPage, currentPage],
    queryFn: () =>
      fetch(
        `http://localhost:8000/categories/${user.uid}?page=${currentPage}&limit=${itemsPerPage}&searchText=${searchText}`
      ).then((res) => res.json()),
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
    if (data) {
      setTotal(data.total);
    }
  }, [isLoading, error, setProgress, total, setTotal, data]);

  const handleCreate = () => {
    document.getElementById("custom-modal").showModal();
    setTitle("Create Category");
    setFormData({
      name: "",
    });
    setIsUpdate(false);
  };

  const handleEdit = (category) => {
    document.getElementById("custom-modal").showModal();
    setTitle("Update Category");
    setFormData(category);
    setIsUpdate(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(50);
    document.getElementById("custom-modal").close();
    if (isUpdate) {
      try {
        const res = await fetch(
          `http://localhost:8000/categories/${formData.id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
            }),
          }
        );
        const data = await res.json();
        if (data.message && res.status === 200) {
          successToast(data.message);
          setProgress(100);
          refetch();
        }
      } catch (error) {
        errorToast(error.message);
        setProgress(100);
      }
    } else {
      formData.user = user.uid;
      try {
        const res = await fetch("http://localhost:8000/categories", {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
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
    }
  };

  const handleDeleteCategory = async () => {
    document.getElementById("confirmation-modal").close();
    setProgress(50);
    try {
      const res = await fetch(
        `http://localhost:8000/categories/${deletingCategory.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        successToast(data.message);
        refetch();
        setProgress(100);
      }
    } catch (error) {
      errorToast(error.message);
      setProgress(100);
    }
  };


  return (
    <section className="bg-white m-3 md:m-7 p-3 md:p-10 shadow-md">
      <div className="flex gap-4 md:gap-0 flex-col md:flex-row items-center justify-between px-3">
        <h2 className="text-2xl font-semibold">Categories</h2>

        <div className="flex gap-2 items-center">
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
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
              <th className="w-1/3">ID</th>
              <th className="w-1/3">Name</th>
              <th className="w-1/3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.categories.map((category) => (
              <tr key={category.id}>
                <th>{category.id}</th>
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => {
                      handleEdit(category);
                    }}
                    className="btn btn-outline btn-success mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("confirmation-modal").showModal();
                      setDeletingCategory(category);
                    }}
                    className="btn btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider"></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <span className="text-nowrap">Items Per Page</span>
            <select
              onChange={(e) => {
                setItemsPerPage(e.target.value);
                setCurrentPage(1);
              }}
              value={itemsPerPage}
              className="select select-bordered w-full max-w-xs"
            >
              <option>2</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>30</option>
              <option>50</option>
            </select>
            <span className="text-nowrap">{(currentPage - 1) * itemsPerPage + 1} - {currentPage * itemsPerPage} of {total}</span>
          </div>
        </div>
        <div className="join">
          <button
            disabled={currentPage == 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn join-item"
          >
            <i className="fa-solid fa-angles-left"></i> Previous
          </button>
          {Array(totalPages)
            .fill(null)
            .map((_, index) => {
              const page = index + 1;
              const isVisible =
                page >= currentPage - 2 && page <= currentPage + 2;
              return (
                <button
                  onClick={() => {
                    setCurrentPage(index + 1);
                  }}
                  key={index}
                  className={`btn join-item ${isVisible ? "" : "hidden"} ${
                    currentPage == index + 1 &&
                    "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          <button
            disabled={currentPage == totalPages}
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
            className="btn join-item"
          >
            Next <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
      <CustomModal title={title}>
        <CategoryForm
          isUpdate={isUpdate}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          deletingCategory={deletingCategory}
        />
      </CustomModal>
      <ConfirmationModal handleDelete={handleDeleteCategory} />
    </section>
  );
};

export default Category;

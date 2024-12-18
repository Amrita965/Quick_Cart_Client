import { useContext, useEffect, useState } from "react";
import CustomModal from "../../../Components/UserDashboard/CustomModal";
import useCustomHookForm from "../../../CustomHooks/useCustomHookForm";
import CreateCustomer from "./CreateCustomer";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import { errorToast, successToast } from "../../../utilities/toast";

const Customer = () => {
  const { user, setProgress } = useContext(AuthContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [searchText, setSearchText] = useState("");

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const [formData, setFormData, handleInputChange] = useCustomHookForm({
    name: "",
    email: "",
    mobile: "",
  });

  const {
    data,
    refetch,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["customers", itemsPerPage, currentPage, searchText],
    queryFn: () =>
      fetch(
        `http://localhost:8000/customers/${
          user?.uid
        }?page=${currentPage}&limit=${itemsPerPage}&search=${searchText.trim()}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    if (loading) {
      setProgress(50);
    } else {
      setProgress(100);
    }
    if (error) {
      errorToast(error.message);
    }
    if (data) {
      setTotalItems(data.total);
    }
  }, [data, loading, error, setProgress]);

  const handleSubmit = async (e) => {
    document.getElementById("custom-modal").close();
    setProgress(50);
    e.preventDefault();

    if (isUpdate) {
      setIsUpdate(false);
      try {
        const response = await fetch(
          `http://localhost:8000/customers/${formData.id}`,
          {
            headers: {
              "content-type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (response.status === 201) {
          successToast("Customer updated successfully");
          refetch();
          setProgress(100);
        }
      } catch (error) {
        errorToast(error.message);
        setProgress(100);
      }
    } else {
      const customer = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        user: user.uid,
      };

      try {
        const res = await fetch("http://localhost:8000/customers/", {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(customer),
        });
        const data = await res.json();
        if (res.status === 201) {
          successToast("Customer created successfully");
          setProgress(100);
        }
        setFormData({
          name: "",
          email: "",
          mobile: "",
        });

        refetch();
      } catch (error) {
        errorToast(error.message);
        setProgress(100);
      }
    }
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setTitle("Update Customer");
    setIsUpdate(true);
    document.getElementById("custom-modal").showModal();
  };

  const handleDelete = async () => {
    setProgress(50);
    document.getElementById("confirmation-modal").close();
    try {
      const res = await fetch(
        `http://localhost:8000/customers/${deletingCustomer.id}`,
        {
          method: "DELETE",
        }
      );
      // const data = await res.json();

      if (res.status === 204) {
        successToast("Customer Deleted successfully.");
        setProgress(100);
      }
      refetch();
    } catch (error) {
      errorToast(error.message);
      setProgress(100);
    }
  };

  return (
    <section className="bg-white m-3 md:m-7 p-3 md:p-10 shadow-md">
      <div className="flex gap-4 md:gap-0 flex-col md:flex-row items-center justify-between px-3">
        <h2 className="text-2xl font-semibold">Customers</h2>

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
            onClick={() => {
              setTitle("Create Customer");
              document.getElementById("custom-modal").showModal();
              setFormData({
                name: "",
                email: "",
                mobile: "",
              });
            }}
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
              <th className="w-1/5">ID</th>
              <th className="w-1/5">Name</th>
              <th className="w-1/5">Email</th>
              <th className="w-1/5">Mobile</th>
              <th className="w-1/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.customers ? "" : ""}
            {data?.customers.map((customer) => (
              <tr key={customer.id}>
                <th>{customer.id}</th>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.mobile}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="btn btn-outline btn-success grow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        document
                          .getElementById("confirmation-modal")
                          .showModal();
                        setDeletingCustomer(customer);
                      }}
                      className="btn btn-outline btn-error grow"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider"></div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <span className="text-nowrap">Items Per Page</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
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
            <span className="text-nowrap">
              {data?.customers.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}{" "}
              -{" "}
              {currentPage * itemsPerPage > totalItems
                ? totalItems
                : currentPage * itemsPerPage}{" "}
              of {totalItems}
            </span>
          </div>
        </div>
        <div className="join">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn join-item"
          >
            <i className="fa-solid fa-angles-left"></i> Previous
          </button>
          {Array(totalPage)
            .fill(null)
            .map((_, index) => {
              const page = index + 1;
              const isVisible =
                page >= currentPage - 2 && page <= currentPage + 2;

              return (
                <button
                  onClick={() => setCurrentPage(page)}
                  key={index}
                  className={`btn join-item ${isVisible ? "" : "hidden"} ${
                    currentPage === page &&
                    "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPage}
            className="btn join-item"
          >
            Next <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
      <CustomModal setIsUpdate={setIsUpdate} title={title}>
        <CreateCustomer
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      </CustomModal>
      <ConfirmationModal handleDelete={handleDelete} />
    </section>
  );
};

export default Customer;

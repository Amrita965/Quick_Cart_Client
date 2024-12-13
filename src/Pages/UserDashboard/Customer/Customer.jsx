import { useContext, useEffect, useState } from "react";
import CustomModal from "../../../Components/UserDashboard/CustomModal";
import useCustomHookForm from "../../../CustomHooks/useCustomHookForm";
import CreateCustomer from "./CreateCustomer";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import { errorToast, successToast } from "../../../utilities/toast";
import { array } from "prop-types";

const Customer = () => {
  const { user } = useContext(AuthContext);
  // const [seletedRow, setSelectedRow] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState({});
  const [totalItem, setTotalItem] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalItem / itemPerPage);

  const [formData, setFormData, handleInputChange] = useCustomHookForm({
    name: "",
    email: "",
    mobile: "",
  });

  const {
    data,
    refetch,
    isLoading: loading,
  } = useQuery({
    queryKey: ["customers", itemPerPage, currentPage],
    queryFn: () =>
      fetch(
        `http://localhost:8000/customers/${user?.uid}?page=${currentPage}&limit=${itemPerPage}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      setTotalItem(data.total);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isUpdate) {
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
          setIsLoading(false);
          document.getElementById("custom-modal").close();
        }
      } catch (error) {
        errorToast(error.message);
        setIsLoading(false);
        document.getElementById("custom-modal").close();
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
        }
        setIsLoading(false);
        setFormData({
          name: "",
          email: "",
          mobile: "",
        });
        document.getElementById("custom-modal").close();
        refetch();
      } catch (error) {
        errorToast(error.message);
        setIsLoading(false);
        document.getElementById("custom-modal").close();
      }
    }
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setIsUpdate(true);
    document.getElementById("custom-modal").showModal();
  };

  const handleDelete = async () => {
    setIsLoading(true);
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
      }
      refetch();
      setIsLoading(false);
      document.getElementById("confirmation-modal").close();
    } catch (error) {
      errorToast(error.message);
      setIsLoading(false);
      document.getElementById("confirmation-modal").close();
    }
  };

  return (
    <section className="bg-white m-3 md:m-7 p-3 md:p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Customer</h2>

        <button
          onClick={() => {
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
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
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
      <div className="mt-20 flex justify-between items-center">
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <span className="text-nowrap">Items Per Page</span>
            <select
              value={itemPerPage}
              onChange={(e) => {
                setItemPerPage(e.target.value);
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
                ? (currentPage - 1) * itemPerPage + 1
                : 0}{" "}
              -{" "}
              {currentPage * itemPerPage > totalItem
                ? totalItem
                : currentPage * itemPerPage}{" "}
              of {totalItem}
            </span>
          </div>
        </div>
        <div className="join">
          <button disabled={currentPage==1} onClick={() => setCurrentPage((prev) => prev - 1)} className="btn join-item">
            <i className="fa-solid fa-angles-left"></i>Previous
          </button>
          {Array(totalPage)
            .fill(null)
            .map((_, index) => (
              <button
                onClick={() => setCurrentPage(index + 1)}
                key={index}
                className={`btn join-item ${currentPage == index + 1 && "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"}`}
              >
                {index + 1}
              </button>
            ))}
          <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage==totalPage} className="btn join-item">
            Next <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
      <CustomModal setIsUpdate={setIsUpdate} title="Create Customer">
        <CreateCustomer
          isLoading={isLoading}
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      </CustomModal>
      <ConfirmationModal handleDelete={handleDelete} isLoading={isLoading} />
    </section>
  );
};

export default Customer;

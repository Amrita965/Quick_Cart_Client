import { useContext, useState } from "react";
import CustomModal from "../../../Components/UserDashboard/CustomModal";
import useCustomHookForm from "../../../CustomHooks/useCustomHookForm";
import CreateCustomer from "./CreateCustomer";
import Toastify from "toastify-js";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Customer = () => {
  const { user, isLoading, setIsLoading } = useContext(AuthContext);
  // const [seletedRow, setSelectedRow] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData, handleInputChange] = useCustomHookForm({
    name: "",
    email: "",
    mobile: "",
  });

  const {
    data: customers = [],
    refetch,
    isLoading: loading,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () =>
      fetch("http://localhost:8000/customers/").then((res) => res.json()),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(isUpdate);

    if (isUpdate) {
      // console.log("Update")
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
        if (data.message && response.status === 201) {
          Toastify({
            text: data.message,
            close: true,
            duration: 5000,
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
          refetch();
          setIsLoading(false);
          document.getElementById("custom-modal").close();
        }
      } catch (error) {
        Toastify({
          text: error.message,
          position: "center",
          style: {
            background: "linear-gradient(to right, #ff0000, #ff6666)",
          },
        }).showToast();
        setIsLoading(false);
        document.getElementById("custom-modal").close();
      }
      console.log(formData);
    } else {
      const customer = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        user: user.uid,
      };

      // console.log(customer)

      try {
        const res = await fetch("http://localhost:8000/customers/", {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(customer),
        });
        const data = await res.json();
        if (data.message && res.status === 201) {
          Toastify({
            text: data.message,
            close: true,
            duration: 5000,
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
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
        Toastify({
          text: error.message,
          position: "center",
          style: {
            background: "linear-gradient(to right, #ff0000, #ff6666)",
          },
        }).showToast();
        setIsLoading(false);
        document.getElementById("custom-modal").close();
      }
    }
  };

  const handleEdit = (customer) => {
    // console.log(customer);
    setFormData(customer);
    setIsUpdate(true);
    document.getElementById("custom-modal").showModal();
  };

  return (
    <section className="bg-white m-7 p-10">
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
            {customers.map((customer) => (
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
                    <button className="btn btn-outline btn-error grow">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </section>
  );
};

export default Customer;

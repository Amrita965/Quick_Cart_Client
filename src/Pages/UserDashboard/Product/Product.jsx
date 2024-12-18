import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./../../../Contexts/AuthProvider";
import { errorToast, successToast } from "../../../utilities/toast";
import ConfirmationModal from "./../../../Components/ConfirmationModal";
import useCustomHookForm from "./../../../CustomHooks/useCustomHookForm";
import CustomModal from "./../../../Components/UserDashboard/CustomModal";
import CreateProduct from "./CreateProduct";
import uploadImage from "../../../utilities/uploadImage";

const Product = () => {
  const { user, setProgress } = useContext(AuthContext);
  const [deletingProduct, setDeletingProduct] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(total / itemsPerPage);
  const [title, setTitle] = useState("");
  const [modalWidth, setModalWidth] = useState("");
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const form = useRef();
  const [searchText, setSearchText] = useState("");

  const [formData, setFormData, handleInputChange] = useCustomHookForm({
    category: "",
    name: "",
    price: "",
    unit: "",
    img_url: "",
  });

  console.log(searchText);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products", searchText],
    queryFn: () =>
      fetch(`http://localhost:8000/products/${user.uid}?searchText=${searchText}`).then((res) =>
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
    if (data) {
      setTotal(data.total);
    }
  }, [isLoading, error, setProgress, data]);

  const handleDeleteProduct = async () => {
    setProgress(50);
    document.getElementById("confirmation-modal").close();

    try {
      const res = await fetch(
        `http://localhost:8000/products/${deletingProduct.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.message) {
        successToast(data.message);
        refetch();
      }
    } catch (error) {
      errorToast(error.message);
      setProgress(100);
    }
  };

  const handleCreate = () => {
    document.getElementById("custom-modal").showModal();
    setTitle("Create Product");
    setIsUpdate(false);
    setModalWidth("max-w-4xl");
    setFormData({
      category: "",
      name: "",
      price: "",
      unit: "",
    });
    setImageURL(null);
  };

  const handleUpdate = (product) => {
    document.getElementById("custom-modal").showModal();
    form?.current?.reset();
    setImageURL(null);
    setTitle("Update Product");
    setIsUpdate(true);
    setModalWidth("max-w-4xl");
    setFormData(product);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // For preview purposes
    const imageURL = URL.createObjectURL(selectedFile);
    setImageURL(imageURL);
  };

  const handleSubmit = async (e) => {
    setProgress(25);
    e.preventDefault();
    document.getElementById("custom-modal").close();

    let img_url = formData.url;
    try {
      if (file) {
        img_url = await uploadImage(file);
      }
    } catch (error) {
      errorToast(error.message);
      setProgress(100);
      return;
    }

    formData.img_url = img_url;
    formData.user = user.uid;

    if (isUpdate) {
      try {
        const res = await fetch(
          `http://localhost:8000/products/${formData.id}`,
          {
            headers: {
              "content-type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(formData),
          }
        );
        const data = await res.json();

        if (data.message && res.status == 202) {
          successToast(data.message);
          setProgress(100);
          refetch();
        } else {
          for (const field in data) {
            errorToast(`${field}:: ${data[field][0]}`);
          }
          setProgress(100);
        }
      } catch (error) {
        errorToast(error.message);
        setProgress(100);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8000/products", {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.message && response.status === 201) {
          successToast(data.message);
          setProgress(100);
          refetch();
          return;
        } else {
          for (const field in data) {
            errorToast(`${field}:: ${data[field][0]}`);
          }
          setProgress(100);
        }
      } catch (error) {
        errorToast(error.message);
        setProgress(100);
      }
    }
  };

  return (
    <section className="bg-white m-3 md:m-7 p-3 md:p-10 shadow-md">
      <div className="flex gap-4 md:gap-0 flex-col md:flex-row items-center justify-between px-3">
        <h2 className="text-2xl font-semibold">Products</h2>

        <div className="flex gap-2 items-center">
          <label className="input input-bordered flex items-center gap-2">
            <input onChange={(e) => setSearchText(e.target.value)} type="text" className="grow" placeholder="Search" />
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
              <th className="w-1/6">ID</th>
              <th className="w-1/6">Image</th>
              <th className="w-1/6">Name</th>
              <th className="w-1/6">Price</th>
              <th className="w-1/6">Unit</th>
              <th className="w-1/6">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={product.img_url}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.price} TK</td>
                <td>{product.unit}</td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(product)}
                      className="btn btn-outline btn-success grow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        document
                          .getElementById("confirmation-modal")
                          .showModal();
                        setDeletingProduct(product);
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
              return (
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  key={index}
                  className={`btn join-item ${
                    currentPage == index + 1 &&
                    "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          <button
            disabled={currentPage === totalPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn join-item"
          >
            Next <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
      <ConfirmationModal handleDelete={handleDeleteProduct} />
      <CustomModal title={title} modalWidth={modalWidth}>
        <CreateProduct
          handleSubmit={handleSubmit}
          form={form}
          handleFileChange={handleFileChange}
          formData={formData}
          handleInputChange={handleInputChange}
          imageURL={imageURL}
          isUpdate={isUpdate}
        />
      </CustomModal>
    </section>
  );
};

export default Product;

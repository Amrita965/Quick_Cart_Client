import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import dummpyImg from "../../../assets/images/dummy-img.png";
import Category from "./../Category/Category";

const CreateProduct = ({
  form,
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  imageURL,
  isUpdate,
}) => {
  const { category, name, price, unit, img_url } = formData;

  const { user } = useContext(AuthContext);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`http://localhost:8000/categories/${user.uid}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return;
  }

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Category</span>
        </div>
        <select
          required
          name="category"
          value={category}
          onChange={handleInputChange}
          className="select select-bordered w-full"
        >
          <option value="">---SELECT CATEOGRY---</option>
          {data?.categories.map((category, index) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Name*</span>
        </div>
        <input
          value={name}
          onChange={handleInputChange}
          required
          name="name"
          type="text"
          placeholder="Product Name"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Price*</span>
        </div>
        <input
          min="1"
          value={price}
          onChange={handleInputChange}
          required
          name="price"
          type="text"
          placeholder="Product Price"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Unit*</span>
        </div>
        <input
          min="1"
          value={unit}
          onChange={handleInputChange}
          required
          name="unit"
          type="text"
          placeholder="Product Unit"
          className="input input-bordered w-full"
        />
      </label>
      <div>
        <img
          className="w-28"
          src={imageURL ? imageURL : img_url ? img_url : dummpyImg}
          alt=""
        />
      </div>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Image*</span>
        </div>
        <input
          required={img_url ? false : true}
          name="image"
          onChange={handleFileChange}
          type="file"
          className="file-input file-input-bordered w-full"
        />
      </label>
      <div className="flex gap-2 justify-end mt-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("custom-modal").close();
          }}
          className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
        >
          CLOSE
        </button>
        <button className="btn bg-gradient-to-r from-emerald-500 to-lime-600 text-white">
          {isUpdate ? "UPDATE" : "SAVE"}
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;

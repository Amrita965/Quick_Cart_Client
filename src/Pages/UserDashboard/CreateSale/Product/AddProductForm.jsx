const AddProductForm = ({ selectedProduct, handleAddProduct }) => {
  return (
    <form onSubmit={handleAddProduct}>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Product ID*</span>
        </div>
        <input
          defaultValue={selectedProduct?.id}
          disabled
          type="text"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Product Name*</span>
        </div>
        <input
          disabled
          defaultValue={selectedProduct?.name}
          type="text"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold">Product Price*</span>
        </div>
        <input
          disabled
          defaultValue={selectedProduct?.price}
          type="text"
          placeholder="Customer Mobile"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold">Product Quantity*</span>
        </div>
        <input
          min="1"
          defaultValue="1"
          type="quantity"
          name="quantity"
          placeholder="Customer Mobile"
          className="input input-bordered w-full"
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
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;

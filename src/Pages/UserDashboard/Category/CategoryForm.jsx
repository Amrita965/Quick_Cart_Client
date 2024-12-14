const CategoryForm = ({ isUpdate, handleInputChange, formData, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text font-semibold">Category Name*</span>
          </div>
          <input
            onChange={handleInputChange}
            value={formData.name}
            required
            name="name"
            type="text"
            placeholder="Category Name"
            className="input input-bordered w-full"
          />
        </label>
        <div className="flex gap-2 justify-end mt-5">
          <button onClick={(e) => {
            e.preventDefault();
            document.getElementById("custom-modal").close();
          }} className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
            CLOSE
          </button>
          <button className="btn bg-gradient-to-r from-emerald-500 to-lime-600 text-white">
            {isUpdate ? "UPDATE" : "SAVE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

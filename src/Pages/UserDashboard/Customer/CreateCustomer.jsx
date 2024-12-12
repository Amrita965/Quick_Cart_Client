const CreateCustomer = ({ formData, handleInputChange, handleSubmit, isLoading, isUpdate, setIsUpdate, setFormData }) => {
  const { name, email, mobile } = formData;
  return (
    <form onSubmit={handleSubmit}>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Customer Name*</span>
        </div>
        <input
          required
          value={name}
          onChange={handleInputChange}
          name="name"
          type="text"
          placeholder="Customer Name"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text font-semibold">Customer Email*</span>
        </div>
        <input
          required
          value={email}
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Customer Email"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold">Customer Mobile*</span>
        </div>
        <input
          required
          value={mobile}
          onChange={handleInputChange}
          name="mobile"
          type="text"
          placeholder="Customer Mobile"
          className="input input-bordered w-full"
        />
      </label>
      <div>
        <div className="flex gap-2 justify-end mt-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsUpdate(false)
              setFormData({
                name: "",
                email: "",
                mobile: "",
              })
              document.getElementById("custom-modal").close();
            }}
            className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
          >
            CLOSE
          </button>
          <button className="btn bg-gradient-to-r from-emerald-500 to-lime-600 text-white">
            {isLoading && <span className="loading loading-spinner loading-md"></span>}{isUpdate ? "UPDATE": "SAVE"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateCustomer;

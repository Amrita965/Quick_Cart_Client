const Product = () => {
  return (
    <section className="bg-white m-3 md:m-7 p-3 md:p-10 shadow-md">
      <div className="flex gap-4 md:gap-0 flex-col md:flex-row items-center justify-between px-3">
        <h2 className="text-2xl font-semibold">Products</h2>

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
            onClick={() => {}}
            className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
          >
            CREATE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;

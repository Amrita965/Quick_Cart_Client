import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "./../../../Contexts/AuthProvider";
import { errorToast } from "../../../utilities/toast";

const Product = () => {
  const { user, setProgress } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`http://localhost:8000/products/${user.uid}`).then((res) =>
        res.json()
      ),
  });

  useEffect(() => {
    if(isLoading) {
      setProgress(50);
    } else {
      setProgress(100);
    }
    if(error) {
      errorToast(error.message);
    }
  }, [isLoading, error, setProgress]);

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
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="w-1/5">ID</th>
              <th className="w-1/5">Name</th>
              <th className="w-1/5">Price</th>
              <th className="w-1/5">Unit</th>
              <th className="w-1/5">Action</th>
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
                <td>{product.price} TK</td>
                <td>{product.unit}</td>

                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-success grow">
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
      <div className="divider"></div>
    </section>
  );
};

export default Product;

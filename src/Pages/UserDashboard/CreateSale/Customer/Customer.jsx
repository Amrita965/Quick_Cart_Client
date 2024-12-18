import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../Contexts/AuthProvider";

const Customer = ({setCustomer}) => {
  const { user, setProgress } = useContext(AuthContext);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const totalPage = Math.ceil(totalItems / itemsPerPage);

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

  return (
    <section className="bg-white m-3  p-3 md:p-5 shadow-md rounded-lg">
      <div className="flex gap-4 md:gap-0 flex-col md:flex-row items-center justify-between px-3">
        <h2 className="font-semibold">Customers</h2>

        <div className="flex gap-2 items-center">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            placeholder="Search"
            className="input input-bordered input-sm w-full"
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="w-3/4">Customers</th>
              <th className="w-1/4">Pick</th>
            </tr>
          </thead>
          <tbody>
            {data?.customers ? "" : ""}
            {data?.customers.map((customer) => (
              <tr key={customer.id}>
                <td className="text-xs">
                  {customer.name}{" "}
                  <span className="font-medium">({customer.mobile})</span>
                </td>
                <td>
                  <button onClick={() => setCustomer(customer)} className="btn btn-outline btn-xs">ADD</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider"></div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-end items-center">
        <div className="join">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn join-item btn-sm"
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
                  className={`btn btn-sm join-item ${
                    isVisible ? "" : "hidden"
                  } ${
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
            className="btn join-item btn-sm"
          >
            Next <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Customer;

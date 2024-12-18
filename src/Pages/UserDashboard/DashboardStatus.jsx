import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from './../../Contexts/AuthProvider';
import {errorToast} from '../../utilities/toast';

const DashboardStatus = () => {
  const {user, setProgress} = useContext(AuthContext);

  const { error, data, isLoading } = useQuery({
    queryKey: ['dashboard-status'],
    queryFn: () =>
      fetch(`http://localhost:8000/dashboard-status/${user.uid}`).then((res) =>
        res.json(),
      ),
  })

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
    <div className="grid grid-cols-1 gap-4 px-4 mt-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:px-8">
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400">
          <i className="fa-solid fa-box-open h-12 w-12 text-white text-4xl flex items-center justify-center"></i>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Product</h3>
          <p className="text-3xl font-medium">{data?.total_products}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-blue-400">
        <i className="fa-solid fa-list h-12 w-12 text-white text-4xl flex items-center justify-center"></i>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Category</h3>
          <p className="text-3xl font-medium">{data?.total_categories}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-indigo-400">
        <i className="fa-solid fa-users h-12 w-12 text-white text-4xl flex items-center justify-center"></i>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Customer</h3>
          <p className="text-3xl font-medium">{data?.total_customers}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400">
        <i className="fa-regular fa-file-lines h-12 w-12 text-white text-4xl flex items-center justify-center"></i>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Invoice</h3>
          <p className="text-3xl font-medium">0</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-purple-400">
        <i className="fa-solid fa-money-bill-1-wave h-12 w-12 text-white text-4xl flex items-center justify-center"></i>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Sale</h3>
          <p className="text-3xl font-medium">৳0</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-orange-400">
        <i className="fa-regular fa-file h-12 w-12 text-white text-4xl flex items-center justify-center"></i>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Vat Collection</h3>
          <p className="text-3xl font-medium">৳0</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-fuchsia-400">
        <i className="fa-solid fa-hand-holding-dollar h-12 w-12 text-white text-4xl flex items-center justify-center"></i>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Collection</h3>
          <p className="text-3xl font-medium">৳0</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatus;
import logo from "../../../../assets/logo/quick-cart-logo.png";

const Invoice = ({ customer, selectedProducts }) => {
  const { id, name, email, mobile } = customer;
  return (
    <section className="bg-white m-3  p-3 md:p-5 shadow-md rounded-lg">
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-1 col-span-2">
          <h4 className="font-semibold">BILLED TO</h4>
          <p className="text-xs">
            <span className="font-semibold">User ID:</span> {id}
          </p>
          <p className="text-xs">
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p className="text-xs">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p className="text-xs">
            <span className="font-semibold">Phone:</span> {mobile}
          </p>
        </div>
        <div className=" flex flex-col">
          <div className="flex items-center">
            <img className="w-14" src={logo} alt="" />
            <h2 className="font-semibold">Quick Cart</h2>
          </div>
          <h4 className="font-medium  mt-3">Invoice</h4>
          <p className="text-xs">Date:2024-12-18</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((selectedProduct, idx) => (
              <tr key={idx}>
                <td className="text-xs">{selectedProduct.name}</td>
                <td className="text-xs">{selectedProduct.quantity}</td>
                <td className="text-xs">{selectedProduct.total_price}</td>
                <td className="text-xs">
                  <button className="btn btn-xs">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold">
          TOTAL: <span>0</span>
        </p>
        <p className="text-xs font-semibold">
          PAYABLE: <span>0</span>
        </p>
        <p className="text-xs font-semibold">
          VAT: <span>0</span>
        </p>
        <p className="text-xs font-semibold">
          DISCOUNT: <span>0</span>
        </p>
      </div>
      <div className="mt-5">
        <label className="text-sm block mb-1" htmlFor="">
          Discount (%)
        </label>
        <input
          type="number"
          min="0"
          step="0.25"
          defaultValue="0"
          className="input input-sm input-bordered input-md w-full max-w-36 block mb-3"
        />
        <button className="btn btn-sm bg-gradient-to-r from-emerald-500 to-lime-600 text-white">
          CONFIRM
        </button>
      </div>
    </section>
  );
};

export default Invoice;

import { useState } from "react";
import Customer from "./Customer/Customer";
import Invoice from "./Invoice/Invoice";
import Product from "./Product/Product";

const CreateSale = () => {
    const [customer, setCustomer] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);

    return (
        <div className="grid xl:grid-cols-2 2xl:grid-cols-3">
            <Invoice selectedProducts={selectedProducts} customer={customer} />
            <Product setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />
            <Customer setCustomer={setCustomer} />
        </div>
    );
};

export default CreateSale;
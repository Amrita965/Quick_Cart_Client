import { useState } from "react";

const useCustomHookForm = (data={}) => {
    const [formData, setFormData] = useState(data);

    const handleInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return [formData, setFormData, handleInputChange];
}

export default useCustomHookForm;
import { useState } from "react";

const useCustomHookForm = (data={}) => {
    const [formData, setFormData] = useState(data);

    console.log(formData)

    const handleInputChange = (e) => {

        console.log(e.target.name)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return [formData, setFormData, handleInputChange];
}

export default useCustomHookForm;
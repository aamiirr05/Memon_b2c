import { useState } from 'react';

const useFormData = () => {
  const [formData, setFormData] = useState(new FormData());

  const updateFormData = (key, value) => {
    const updatedFormData = new FormData(formData);
    updatedFormData.append(key, value);
    setFormData(updatedFormData);
  };

  const resetFormData = () => {
    setFormData(new FormData());
  };

  return { formData, updateFormData, resetFormData };
};

export default useFormData;

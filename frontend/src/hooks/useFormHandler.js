import { useState } from "react";
import { z } from "zod";

function useFormHandler({ initialValues, validationSchema }) {
  const [values, setvalues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    let { name, value } = e.target;
    setvalues((prev) => ({ ...prev, [name]: value }));

    try {
      validationSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error.errors && error.errors.length > 0) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  }

  return {
    values,
    handleChange,
    errors,
  };
}

export default useFormHandler;

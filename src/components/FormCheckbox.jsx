import React from "react";

const FormCheckbox = ({ label, name, defaultValue, size = "checkbox-md" }) => {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <input
        type="checkbox"
        name={name}
        id={name}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size} transition-all duration-200`}
      />
      <label
        htmlFor={name}
        className="cursor-pointer select-none text-gray-700 font-medium capitalize hover:text-primary transition-colors duration-200"
      >
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;

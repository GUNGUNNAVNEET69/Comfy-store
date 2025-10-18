import React, { useState } from "react";
import { formatPrice } from "../utils";

const FormRange = ({ label, name, size , price}) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectPrice, setSelectPrice] = useState(maxPrice);
  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectPrice)}</span>
      </label>

      <input
        type="range"
        name={name}
        min={0}
        max={price || maxPrice}
        value={selectPrice}
        onChange={(e) => setSelectPrice(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />

      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default FormRange;

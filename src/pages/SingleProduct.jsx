import React from "react";
import { useLoaderData } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOpt } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/carts/cartSlice";

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);

  const [productColors, setProductsColors] = useState(colors[0]);
  const [amount, setAmount] = useState(1);


  const cartProduct = {
    cartID: product.id + productColors,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColors,
    amount
  };

  const dispatch = useDispatch();

  const addtoCart = () =>{
    dispatch(addItem({product:cartProduct}))
  }
  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCTS */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 ">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />

        {/* PRODUCTS */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-amber-500 font-bold mt-2">{company}</h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColors && "border-2 border-secondary"
                    }`}
                    style={{ background: color }}
                    onClick={() => setProductsColors(color)}
                  ></button>
                );
              })}
            </div>
          </div>

          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={(e)=>setAmount(Number(e.target.value))}
            >
              {generateAmountOpt(20)}
            </select>
          </div>

          {/* cart button */}
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={addtoCart}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;

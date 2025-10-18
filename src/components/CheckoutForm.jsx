import React, { useRef } from "react";
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { toast } from "react-toastify";
import { clearCart } from "../features/carts/cartSlice";
import { customFetch, formatPrice } from "../utils";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      const status = error?.response?.status;
      if (status === 401 || status === 403) return redirect("/login");

      return null;
    }
  };

const CheckoutForm = () => {
  const cardRef = useRef(null);

  // Mouse move par tilt effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X within card
    const y = e.clientY - rect.top; // Mouse Y within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 25).toFixed(2);
    const rotateY = ((centerX - x) / 25).toFixed(2);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div className="flex justify-center items-start min-h-[100vh] px-3 ">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="transition-transform duration-200"
      >
        <Form
          method="POST"
          className="flex flex-col gap-y-4 w-full max-w-sm p-6 rounded-xl 
          bg-gray-950 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] 
          border border-gray-800 transition-all duration-300"
        >
          <h4 className="text-xl font-semibold text-center text-white mb-2 tracking-wide drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">
            Shipping Information
          </h4>

          <div className="relative group">
            <FormInput
              label="First Name"
              name="name"
              type="text"
              className="w-full bg-gray-800/70 text-gray-100 border border-gray-700 
              rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:shadow-[0_0_18px_rgba(59,130,246,0.6)] transition-all duration-300 text-sm"
            />
            <span className="absolute -bottom-[2px] left-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 group-focus-within:w-full"></span>
          </div>

          <div className="relative group">
            <FormInput
              label="Address"
              name="address"
              type="text"
              className="w-full bg-gray-800/70 text-gray-100 border border-gray-700 
              rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:shadow-[0_0_18px_rgba(59,130,246,0.6)] transition-all duration-300 text-sm"
            />
            <span className="absolute -bottom-[2px] left-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 group-focus-within:w-full"></span>
          </div>

          <div className="mt-2">
            <SubmitBtn
              text="Place your order"
              className="relative w-full py-2.5 rounded-md text-base font-semibold text-white 
              bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
              shadow-[0_8px_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]
              transform hover:-translate-y-[2px] transition-all duration-300"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutForm;

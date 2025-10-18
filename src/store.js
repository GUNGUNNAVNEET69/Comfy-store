import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/carts/cartSlice";
import userReducer from "./features/user/userSlice";
export const store = configureStore({
  reducer: { cartState: cartReducer, userState: userReducer },
});

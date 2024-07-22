import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
// import authSlice from "./features/auth/authSlice";
// import cartSlice from "./features/cartSlice";
// import couponSlice from "./features/coupon/couponSlice";
// import orderSlice from "./features/order/orderSlice";
// import wishlistSlice from "./features/wishlist-slice";
// import productSlice from "./features/productSlice";
// import partSlice from "./features/part/partSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authSlice,
    // cart: cartSlice,
    // wishlist: wishlistSlice,
    // coupon: couponSlice,
    // order: orderSlice,
    // product: productSlice,
    // part: partSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

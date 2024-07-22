import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = JSON.parse(localStorage.getItem("auth"));

      if (token) {
        headers.set("Authorization", `Bearer ${token.accessToken}`);
      }
      return headers;
    },
  }),
  // tagTypes: [
  //   "Category",
  //   "Products",
  //   "Discount",
  //   "Coupon",
  //   "Product",
  //   "RelatedProducts",
  // ],
  endpoints: (builder) => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ocean-app-ocjj.vercel.app/",
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

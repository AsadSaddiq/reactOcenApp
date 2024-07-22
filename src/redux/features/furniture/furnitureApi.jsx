import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createMotorsApi: builder.mutation({
      query: (data) => ({
        url: `/motors/motors/`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 600,
    }),

    getFurnitureApi: builder.query({
      query: (params) => ({
        url: `/furniture/furniture/`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
    getFurnitureByIdApi: builder.query({
      query: (id) => ({
        url: `/furniture/furniture/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
    getFeatureApi: builder.query({
      query: (id) => ({
        url: `motors/feature/`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreateMotorsApiMutation,
  useGetFurnitureApiQuery,
  useGetFurnitureByIdApiQuery,
  useGetFeatureApiQuery,
} = authApi;

import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createElectronicsApi: builder.mutation({
      query: (data) => ({
        url: `/electronics/electronics/`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 600,
    }),
    getElectronicsApi: builder.query({
      query: () => ({
        url: `/electronics/electronics/`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
    getElectronicsByIdApi: builder.query({
      query: (id) => ({
        url: `/electronics/electronics/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
    updateElectronicsApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/electronics/electronics/${id}`,
        method: "PUT",
        body: formData,
      }),
      keepUnusedDataFor: 600,
    }),
    deleteElectronicsApi: builder.query({
      query: (id) => ({
        url: `/electronics/electronics/${id}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreateElectronicsApiMutation,
  useGetElectronicsApiQuery,
  useGetElectronicsByIdApiQuery,
  useUpdateElectronicsApiMutation,
  useDeleteElectronicsApiQuery,
} = authApi;

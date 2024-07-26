import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createFurnitureApi: builder.mutation({
      query: (data) => ({
        url: `/furniture/furniture/`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 600,
    }),

    getFurnitureApi: builder.query({
      query: () => ({
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
    updateFurnitureApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `furniture/furniture/${id}`,
        method: "PUT",
        body: formData,
      }),
      keepUnusedDataFor: 600,
    }),
    deleteFurnitureByIdApi: builder.query({
      query: (id) => ({
        url: `/furniture/furniture/${id}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreateFurnitureApiMutation,
  useGetFurnitureApiQuery,
  useGetFurnitureByIdApiQuery,
  useUpdateFurnitureApiMutation,
  useDeleteFurnitureByIdApiQuery,
} = authApi;

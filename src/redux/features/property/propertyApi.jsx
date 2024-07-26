// import { apiSlice } from "../../api/apiSlice";

// export const authApi = apiSlice.injectEndpoints({
//   overrideExisting: true,
//   endpoints: (builder) => ({
//     createPropertyApi: builder.mutation({
//       query: (data) => ({
//         url: `property/properties/`,
//         method: "POST",
//         body: data,
//       }),
//       keepUnusedDataFor: 600,
//     }),

//     getAmenitiesApi: builder.query({
//       query: (params) => ({
//         url: `property/amenities/`,
//         method: "GET",
//       }),
//       keepUnusedDataFor: 600,
//     }),

//     getPropertyApi: builder.query({
//       query: (params) => ({
//         url: `property/properties/`,
//         method: "GET",
//       }),
//       keepUnusedDataFor: 600,
//     }),
//     getPropertyByIdApi: builder.query({
//       query: (id) => ({
//         url: `property/properties/${id}`,
//         method: "GET",
//       }),
//       keepUnusedDataFor: 600,
//     }),
//   }),
// });

// export const {
//   useCreatePropertyApiMutation,
//   useGetAmenitiesApiQuery,
//   useGetPropertyApiQuery,
//   useGetPropertyByIdApiQuery,
// } = authApi;
import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createPropertyApi: builder.mutation({
      query: (data) => ({
        url: `property/properties/`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 600,
    }),

    getAmenitiesApi: builder.query({
      query: () => ({
        url: `property/amenities/`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),

    getPropertyApi: builder.query({
      query: () => ({
        url: `property/properties/`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),

    getPropertyByIdApi: builder.query({
      query: (id) => ({
        url: `property/properties/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),

    updatePropertyApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `property/properties/${id}/`,
        method: "PUT",
        body: formData,
      }),
      keepUnusedDataFor: 600,
    }),

    deletePropertyApi: builder.query({
      query: (id) => ({
        url: `property/properties/${id}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreatePropertyApiMutation,
  useGetAmenitiesApiQuery,
  useGetPropertyApiQuery,
  useGetPropertyByIdApiQuery,
  useUpdatePropertyApiMutation,
} = authApi;

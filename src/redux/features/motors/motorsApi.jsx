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

    getMotorsApi: builder.query({
      query: (params) => ({
        url: `/motors/motors/`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
    getMotorsByIdApi: builder.query({
      query: (id) => ({
        url: `/motors/motors/${id}`,
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
  useGetMotorsApiQuery,
  useGetMotorsByIdApiQuery,
  useGetFeatureApiQuery,
} = authApi;

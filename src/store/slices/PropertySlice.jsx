import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getShowingProperty: builder.query({
      query: () => `property/properties/`,
      providesTags: ["Products"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetShowingPropertyQuery } = authApi;

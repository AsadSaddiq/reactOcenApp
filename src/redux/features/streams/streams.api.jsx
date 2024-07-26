import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getStreamDataApi: builder.query({
      query: () => ({
        url: `/stream/mixed-data-stream/`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetStreamDataApiQuery } = authApi;

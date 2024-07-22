import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //register user
    registerUser: builder.mutation({
      query: (data) => ({
        url: "auth/users/",
        method: "POST",
        body: data,
      }),
    }),

    // login
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/jwt/jwt/create/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data) {
            console.log("called");
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result?.data?.access,
                refreshToken: result?.data?.refresh,
              })
            );

            // dispatch(
            //   userLoggedIn({
            //     accessToken: result?.data?.Data?.Token,
            //     user: result?.data?.Data?.UserId,
            //   })
            // );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),

    // get me
    getUser: builder.query({
      query: () => "api/user/me",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // confirmEmail
    confirmEmail: builder.query({
      query: (token) => `api/user/confirmEmail/${token}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "api/user/forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    confirmForgotPassword: builder.mutation({
      query: (data) => ({
        url: "api/user/confirm-forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "api/ChangePassword",
        method: "POST",
        body: data,
      }),
    }),
    // change password
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `api/user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useConfirmEmailQuery,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi;

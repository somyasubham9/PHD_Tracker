import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "constants/constants";

export const userServicesApi = createApi({
  reducerPath: "userServicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AppConstants.baseUrl,
  }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.registerUser,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    userLogin: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.login,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: AppConstants.endPoints.userProfile,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
  }),
});

export const { useUserRegisterMutation, useUserLoginMutation } =
  userServicesApi;

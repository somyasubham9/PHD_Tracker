import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../Constants/constants";

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

      userUpdate: builder.mutation({
      query: ({ id, area_of_research }) => {
          console.log(area_of_research, id);
          console.log(`Making PATCH request to: ${AppConstants.endPoints.updateUser}/${id}`);
          return {
              url: `${AppConstants.endPoints.updateUser}/${id}/update/`,
              method: "PATCH",
              body: { area_of_research },
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  Authorization: `Bearer ${sessionStorage.getItem("access")}`,
              },
          };
      },
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

export const { useUserRegisterMutation, useUserLoginMutation, useUserUpdateMutation } =
  userServicesApi;

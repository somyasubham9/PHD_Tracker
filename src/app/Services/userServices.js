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
        console.log(
          `Making PATCH request to: ${AppConstants.endPoints.updateUser}/${id}`
        );
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

    statusUpdate: builder.mutation({
      query: ({ id, status }) => {
        console.log(status, id);
        console.log(
          `Making PATCH request to: ${AppConstants.endPoints.updateUser}/${id}`
        );
        return {
          url: `${AppConstants.endPoints.updateUser}/${id}/update/`,
          method: "PATCH",
          body: { status },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${sessionStorage.getItem("access")}`,
          },
        };
      },
    }),

    examinerUpdate: builder.mutation({
      query: ({ id, body }) => {
        console.log(body, id);
        console.log(
          `Making PATCH request to: ${AppConstants.endPoints.updateUser}/${id}`
        );
        return {
          url: `${AppConstants.endPoints.updateUser}/${id}/update/`,
          method: "PATCH",
          body: body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${sessionStorage.getItem("access")}`,
          },
        };
      },
    }),

    indianUpdate: builder.mutation({
      query: ({ id, comments_by_indian }) => {
        console.log(comments_by_indian, id);
        console.log(
          `Making PATCH request to: ${AppConstants.endPoints.updateUser}/${id}`
        );
        return {
          url: `${AppConstants.endPoints.updateUser}/${id}/update/`,
          method: "PATCH",
          body: { comments_by_indian },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${sessionStorage.getItem("access")}`,
          },
        };
      },
    }),

    thesisUpdate: builder.mutation({
      query: ({ id, thesis_url }) => {
        console.log(thesis_url, id);
        console.log(
          `Making PATCH request to: ${AppConstants.endPoints.updateUser}/${id}`
        );
        return {
          url: `${AppConstants.endPoints.updateUser}/${id}/update/`,
          method: "PATCH",
          body: { thesis_url },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${sessionStorage.getItem("access")}`,
          },
        };
      },
    }),

    foreignUpdate: builder.mutation({
      query: ({ id, comments_by_foreign }) => {
        console.log(comments_by_foreign, id);
        console.log(
          `Making PATCH request to: ${AppConstants.endPoints.updateUser}/${id}`
        );
        return {
          url: `${AppConstants.endPoints.updateUser}/${id}/update/`,
          method: "PATCH",
          body: { comments_by_foreign },
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
      query: (id) => ({
        url: `${AppConstants.endPoints.updateUser}/${id}/`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),

    getUserList: builder.query({
      query: () => ({
        url: `${AppConstants.endPoints.updateUser}/list/`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    getUserListERepo: builder.query({
      query: () => ({
        url: `${AppConstants.endPoints.eRepo}`,
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserUpdateMutation,
  useStatusUpdateMutation,
  useExaminerUpdateMutation,
  useForeignUpdateMutation,
  useIndianUpdateMutation,
  useThesisUpdateMutation,
  useLazyGetUserProfileQuery,
  useLazyGetUserListQuery,
  useLazyGetUserListERepoQuery,
} = userServicesApi;

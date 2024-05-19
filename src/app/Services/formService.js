import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../Constants/constants";

export const formServicesApi = createApi({
  reducerPath: "formServicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AppConstants.baseUrl,
  }),
  endpoints: (builder) => ({
    form1ASubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form1ASubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
  }),
});

export const { useForm1ASubmitMutation } =
  formServicesApi;

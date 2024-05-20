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

    form1BSubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form1BSubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form2Submit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form2Submit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form3ASubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form3ASubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form3BSubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form3BSubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form3CSubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form3CSubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form4ASubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form4ASubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form4BSubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form4BSubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form4CSubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form4CSubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form4DSubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form4DSubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form4ESubmit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form4ESubmit,
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }),
    }),
    form5Submit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form5Submit,

    form6Submit: builder.mutation({
      query: (body) => ({
        url: AppConstants.endPoints.form6Submit, // Update this endpoint according to your API
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

export const {
  useForm1ASubmitMutation,
  useForm1BSubmitMutation,
  useForm2SubmitMutation,
  useForm3ASubmitMutation,
  useForm3BSubmitMutation,
  useForm3CSubmitMutation,
  useForm4ASubmitMutation,
  useForm4BSubmitMutation,
  useForm4CSubmitMutation,
  useForm4DSubmitMutation,
  useForm4ESubmitMutation,
  useForm5SubmitMutation,
  useForm6SubmitMutation,
} = formServicesApi;

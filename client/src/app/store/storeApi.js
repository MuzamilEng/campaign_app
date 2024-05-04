import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_KEY = import.meta.env.VITE_REACT_API_URL;
// console.log(API_KEY);
//  https://infra.chequelivros.net/bookstores

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_KEY}` }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    getAdminData: builder.query({
      query: () => `/getAdminData`,
      providesTags: ["Post"],
    }),

    submitForm: builder.mutation({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    updateAdminData: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateAdminData/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    updateAdminStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteAdminData: builder.mutation({
      query: (id) => ({
        url: `/deleteAdminData/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdminDataQuery,
  useGetStoreByIdQuery,
  useSubmitFormMutation,
  useUpdateAdminDataMutation,
  useDeleteAdminDataMutation,
  useUpdateAdminStatusMutation,
} = storeApi;

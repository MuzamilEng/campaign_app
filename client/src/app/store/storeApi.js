import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
// console.log(API_KEY);
//  https://infra.chequelivros.net/bookstores

export const storeApi = createApi({
    reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_KEY}` }),
    endpoints: (builder) => ({
        getAllStore: builder.query({
            query: () => `/store`,
        }),
        getStoreById: builder.query({
            query: (id) => `/store/${id}`,
          }),
        addBookStore: builder.mutation({
            query: (data) => ({
                url: '/bookstores',
                method: 'POST',
                body: data,
            }),
        }),
        updateBookStore: builder.mutation({
            query: ({ id, data }) => ({
              url: `/store/${id}`,
              method: 'PUT',
              body: data,
            }),
        }),
        deleteBookStore: builder.mutation({
            query: (id) => ({
              url: `/store/${id}`,
              method: 'DELETE',
            }),
          }),
        signUpUser: builder.mutation({
            query: (data) => ({
                url: '/auth/signup',
                method: 'POST',
                body: data,
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const {
    useGetAllStoreQuery,
    useGetStoreByIdQuery,
    useAddBookStoreMutation,
    useUpdateBookStoreMutation,
    useDeleteBookStoreMutation,
    useSignUpUserMutation,
    useLoginUserMutation
} = storeApi
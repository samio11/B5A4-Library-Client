import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://b5-a4-library-server.vercel.app/api/borrow",
  }),
  tagTypes: ["borrow"],
  endpoints: (builder) => ({
    createBorrow: builder.mutation({
      query: ({ id, borrowData }) => ({
        url: `/${id}`,
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow"],
    }),
    showBorrowSummary: builder.query({
      query: () => "/borrow-summary",
      providesTags: ["borrow"],
    }),
    getAllBorrowInfo: builder.query({
      query: () => "/borrows",
      providesTags: ["borrow"],
    }),
    getABorrowInfo: builder.query({
      query: (id: string) => `/borrow/${id}`,
      providesTags: ["borrow"],
    }),
    updateBorrowInfo: builder.mutation({
      query: ({ id, borrowData }) => ({
        url: `/edit-borrow/${id}`,
        method: "PATCH",
        body: borrowData,
      }),
      invalidatesTags: ["borrow"],
    }),
    deleteBorrowBook: builder.mutation({
      query: (id: string) => ({
        url: `/delete-borrow/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["borrow"],
    }),
  }),
});

export const {
  useCreateBorrowMutation,
  useGetAllBorrowInfoQuery,
  useShowBorrowSummaryQuery,
  useGetABorrowInfoQuery,
  useDeleteBorrowBookMutation,
  useUpdateBorrowInfoMutation,
} = borrowApi;

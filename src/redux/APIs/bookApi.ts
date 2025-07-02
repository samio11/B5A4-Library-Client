import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "./interfaces/book.interface";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://b5-a4-library-server.vercel.app/api/book",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (bookData: IBook) => ({
        url: "/create-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    getAllBook: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),
    getABook: builder.query({
      query: (id: string) => `/books/${id}`,
    }),
    updateBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/edit-book/${id}`,
        method: "PATCH",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetABookQuery,
  useGetAllBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;

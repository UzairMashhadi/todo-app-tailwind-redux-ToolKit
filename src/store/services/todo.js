// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import apiEndpoint from '../../config/environment'

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://long-ruby-hatchling-shoe.cyclic.app/" }),
  endpoints: (builder) => ({
    getTodo: builder.query({
      query: () => 'get-todo',
    }),
    // CREATE TODO
    createTodo: builder.mutation({
      query: (payload) => ({
        url: "add-todo",
        method: "POST",
        body: payload,
      }),
    }),

    // DELETE TODO
    deleteTodo: builder.mutation({
      query(_id) {
        return {
          url: `delete/${_id}`,
          method: 'DELETE',
        }
      },
    }),

    // UPDATE TODO
    markTodo: builder.mutation({
      query: (payload) => ({
        url: `update/${payload._id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoQuery, useCreateTodoMutation, useDeleteTodoMutation, useMarkTodoMutation } = todoApi
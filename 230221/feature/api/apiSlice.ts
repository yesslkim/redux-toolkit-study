import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Posts {
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[],
    reactions: number
}

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
      getAllPosts: builder.query<Posts[],void>({
        query: () => '/posts',
        transformResponse: (res:any) => res.posts
      }),
      addPost: builder.mutation<Posts[], string>({
        query:(title) => ({
            url: 'posts/add',
            method: 'POST',
            body: JSON.stringify({
                title: title,
                userId: 5,
            })
        })
      })
    }),
});

export const { useGetAllPostsQuery, useAddPostMutation } = apiSlice;



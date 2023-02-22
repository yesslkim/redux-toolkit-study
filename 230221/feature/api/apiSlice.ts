import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Posts {
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[],
    reactions: number
}

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
      getAllPosts: builder.query<Posts[],void>({
        query: () => '/posts',
        providesTags: ['Posts']
      }),
      addPost: builder.mutation<Posts[], string>({
        query:(title) => ({
            url: '/posts',
            method: 'POST',
            body:  {
                "title": title,
                "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
                "userId": 9,
                "tags": [
                  "history",
                  "american",
                  "crime"
                ],
                "reactions": 2
            },
        }),
        invalidatesTags: ['Posts']
      }),
      deletePost: builder.mutation<Posts[], number>({
        query: (postId) => ({
            url: `/posts/${postId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Posts']
      }),
      updatePost: builder.mutation<Posts[], Partial<Posts>>({
        query: (data) => {
            const {id, title} = data;
            return {
                url:`/posts/${id}`,
                method: 'PATCH',
                body: {title}
            }
        },
        invalidatesTags: ['Posts']
      })
    }),
});

export const { useGetAllPostsQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation } = apiSlice;



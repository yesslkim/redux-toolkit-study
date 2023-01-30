import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  {id: '1', title: 'learning redux-1', content: 'example 1 content.'},
  {id: '2', title: 'learning redux-2', content: 'example 2 content.'}
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
  }
});

export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;


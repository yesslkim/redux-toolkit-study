import React, { useState } from 'react';
import {useAddPostMutation, useGetAllPostsQuery} from '../feature/api/apiSlice';
import './App.css'

function App() {
  const [postTitle, setPostTitle] = useState('')
  const { data:posts, error, isLoading } = useGetAllPostsQuery()
  const [addPost, result] = useAddPostMutation();

  if(isLoading) {
    return <div> Loading ...</div>
  }

  if(error) {
    console.log(error)
    return <div>에러입니다</div>
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPost(postTitle);
    console.log(result);
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  }

  console.log(posts)

  return (
    <div className="App">
      <h2>RTK Query Practice</h2>
      <h3>Posts Lists</h3>
      <ul>
        {
          posts &&
          posts.map(post => (
            <li key={post.id}>
              {post.title}
            </li>
          ))
        }
      </ul>

      <form onSubmit={handleSubmit}>
            <input type="text" value={postTitle } onChange={handleChange}/>
            <button type="submit">제출하기</button>
      </form>


    </div>
  )
}

export default App

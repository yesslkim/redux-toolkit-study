import React, { useState } from 'react';
import {Posts, useAddPostMutation, useDeletePostMutation, useGetAllPostsQuery, useUpdatePostMutation} from '../feature/api/apiSlice';
import './App.css'

function App() {
  const [postTitle, setPostTitle] = useState('')
  const { data:posts, error, isLoading } = useGetAllPostsQuery()
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

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
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  }

  const handleDelete = (postId:number) => {
    deletePost(postId);
  }

  const handleEdit = async (e:React.MouseEvent<HTMLButtonElement>, post:Posts) => {
    const target = e.target as HTMLButtonElement;
    const input = target.previousElementSibling as HTMLInputElement;
    const newPost = {...post, title: input.value};

  
    try {
      const res = await updatePost(newPost).unwrap();
      if(res) {
        alert('수정이 완료되었습니다.')
      }
    } catch(err) {
      console.log(err);
      alert('일시적인 문제로 수정이 되지 않았습니다. 다시 시도 부탁드립니다')
    }
    

  }

  return (
    <div className="App">
      <h2>RTK Query Practice</h2>
      <h3>Posts Lists</h3>
      <ul>
        {
          posts &&
          posts.map(post => (
            <li key={post.id}>
              <input 
                type="text" 
                defaultValue={post.title} 
                style={{width: '600px'}}
              />
              <button type='button' onClick={(e) => handleEdit(e, post)}>수정하기</button>
              <button type='button' onClick={() => handleDelete(post.id)}>삭제하기</button>
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

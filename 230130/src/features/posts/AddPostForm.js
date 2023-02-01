import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from '../users/usersSlice';

import { addNewPost } from "./postsSlice";

const initialValue = {
    title: '',
    body: '',
    userId: ''
}

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState(initialValue);
    const { title, body, userId } = postData;
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const users = useSelector(selectAllUsers);
    const isAllFilledIn = [ title, body, userId].every(post => post.length > 0) && addRequestStatus === 'idle';


  const onChangeField = (e) => setPostData({ ...postData, [e.target.name]: e.target.value })


    const onSavePostClicked = () => {
        if (isAllFilledIn) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost(postData)).unwrap();  
                setPostData(initialValue);
            } catch (err) {
                console.log('Failed to save the post', err);
            } finally {
                setAddRequestStatus('idle')
                
          }
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="title">Post Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={onChangeField}
                />
                <label htmlFor="content">Content:</label>
                <textarea
                    id="body"
                    name="body"
                    value={body}
                    onChange={onChangeField}
                />
                <label htmlFor="userId">Author</label>
                <select
                    name="userId"
                    id="userId"
                    value={userId}
                    onChange={onChangeField}
                >
                    {
                        users.map(user => (
                            <option value={user.id} key={user.id}>
                                {user.name}
                            </option>
                        ))
                    }
                </select>
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!isAllFilledIn}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm
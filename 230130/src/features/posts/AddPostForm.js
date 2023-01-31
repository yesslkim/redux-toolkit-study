import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from '../users/usersSlice';

import { postAdded } from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        userId: ''
    })

  const onChangeField = (e) => setPostData({ ...postData, [e.target.name]: e.target.value })
  const isAllFilledIn = postData.title.length > 0 && postData.content.length > 0 && postData.userId.length > 0;


    const onSavePostClicked = () => {
      if (isAllFilledIn) {
        const { title, content, userId } = postData;

        dispatch(postAdded(title, content, userId));
        setPostData({ title: '', content: '', userId: '' });
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
                    value={postData.title}
                    onChange={onChangeField}
                />
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    value={postData.content}
                    onChange={onChangeField}
                />
                <label htmlFor="userId">Author</label>
                <select
                    name="userId"
                    id="userId"
                    value={postData.userId}
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
import { useState } from "react";
import { useDispatch } from "react-redux";

import { postAdded } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch()
  
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  })

  const onChangeField = (e) => setPostData({ ...postData, [e.target.name]: e.target.value })
  
  const isAllFilledIn = postData.title.length > 0 && postData.content.length > 0;


    const onSavePostClicked = () => {
      if (isAllFilledIn) {
        const { title, content } = postData;

        dispatch(postAdded(title, content));
        setPostData({ title: '', content: '' });
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
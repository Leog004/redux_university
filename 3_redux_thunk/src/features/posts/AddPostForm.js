import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useFormInput from '../../hooks/useFormInput';

import { addNewPost } from './postSlice';
import { selectAllUsers } from '../users/userSlice';

const usePostsActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => ({
        addPost: (title, content, userId) => dispatch(addNewPost({title, body: content, userId})).unwrap()
    }), [dispatch]);
}

const AddPostForm = () => {
    const { addPost } = usePostsActions();
    const users = useSelector(selectAllUsers);

    const [title, onTitleChange, setTitle] = useFormInput('');
    const [content, onContentChange, setContent] = useFormInput('')
    const [userId, onAuthorChange, setUserId] = useFormInput('');
    // eslint-disable-next-line no-unused-vars
    const [requestStatus, onRequestStatusChange, setRequestStatus] = useFormInput('idle')


    const canSave = React.useMemo(() =>
        [title, content, userId].every(Boolean) && requestStatus === 'idle',
        [title, content, userId, requestStatus]);


    const handlePostSubmit = (e) => {
        e.preventDefault();

        if(canSave) {
            try {
                setRequestStatus('pending')
                addPost(title, content, userId);
    
                setTitle('');
                setUserId('');
                setContent('');
            } catch(err) {
                console.error('failed to save', err);
            } finally {
                setRequestStatus('idle');
            }

        }
    }


    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a new Posts</h2>
            <form onSubmit={handlePostSubmit}>
                <label htmlFor='postTitle'>Post Title:</label>
                <input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChange} />

                <label htmlFor='postAuthor'>Select an Author:</label>
                <select id='postAuthor' name='postAuthor' value={userId} onChange={onAuthorChange}>
                    <option value={''} key={'empty'}>Select User</option>
                    {usersOptions}
                </select>

                <label htmlFor='postContent'>Content:</label>
                <textarea type='text' id='postContent' name='postContent' value={content} onChange={onContentChange} />
                <button disabled={!canSave} type='submit'>Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm
import React, { useEffect, useMemo  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postSlice';
import PostsExcerpt from './PostsExcerpt';


const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const status = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const sortedPosts = useMemo(() => {
        return posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    }, [posts]);

    // Early return for no posts case
    if (!posts || posts.length === 0) {
        return (
            <section>
                <h2>Posts</h2>
                <p>No posts found.</p>
            </section>
        );
    }

    let content;

    if(status === 'loading') {
        content = <p>Loading...</p>
    } 
    else if (status === 'succeeded') {
        content = sortedPosts.map(post => (
            <PostsExcerpt key={post.id} post={post} />
        ));
    }
    else if (status === 'failed') {
        content = <p>{error}</p>
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList
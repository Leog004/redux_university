import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    // Early return for no posts case
    if (!posts || posts.length === 0) {
        return (
            <section>
                <h2>Posts</h2>
                <p>No posts found.</p>
            </section>
        );
    }


    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className='postCredit'>
                <PostAuthor post={post} />
                <TimeAgo timeStap={post.date} />
            </p>
            <ReactionButton post={post} />
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList
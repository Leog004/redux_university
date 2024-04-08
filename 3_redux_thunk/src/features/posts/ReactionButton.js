import React from 'react'
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButton = ({ post }) => {
    const dispatch = useDispatch();

    const handleReactionButtonOnClick = (id, name) => {
        dispatch(reactionAdded({
            postId: id,
            reaction: name,
        }));
    };

    if (!post.reactions) {
        return null; // Or render some fallback UI
    }

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={() => handleReactionButtonOnClick(post.id, name)}
        >
            {emoji} {post.reactions[name]}
        </button>
    ));

    return <div>{reactionButtons}</div>;
}

export default ReactionButton
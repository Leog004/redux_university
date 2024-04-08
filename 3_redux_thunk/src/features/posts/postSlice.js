import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { sub } from "date-fns";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL);

    // Create a new map to keep track of unique posts by their ID
    const uniquePostsMap = {};
    let array = [];

    // Iterate over each post in the response data
    response.data.forEach(post => {
        if(!uniquePostsMap[post.id]) {
            uniquePostsMap[post.id] = post;
            array.push(uniquePostsMap[post.id])
        }
    });

    // Convert the map values back to an array; this array will only include unique posts
    return array;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initalPost) => {
    const response = await axios.post(POST_URL, initalPost);
    return response.data
});

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                }
            },
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.reactions[reaction] = (post.reactions[reaction] || 0) + 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';

                let min = 2;

                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    }

                    return post;
                });
                
                state.posts = state.posts.concat(loadedPosts);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString();
            action.payload.reaction = {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }

            state.posts.push(action.payload);
        });
    },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
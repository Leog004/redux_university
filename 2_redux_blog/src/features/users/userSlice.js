import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 0, name: 'john doe'},
    {id: 1, name: 'leo garza'},
    {id: 2, name: 'ace wing'}
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export const selectAllUsers = (state) => state.users;
export default  userSlice.reducer;
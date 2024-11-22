import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: null,
    singlePost: null
}

export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setAllPosts: function(state,action) {
            state.allPosts = action.payload
        },
        setSinglePost: function(state,action) {
            state.singlePost = action.payload
        }
    }
})

export default PostSlice.reducer

export const { setAllPosts,setSinglePost } = PostSlice.actions

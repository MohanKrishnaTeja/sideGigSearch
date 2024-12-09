import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth", // Name of the slice
    initialState: { 
        loading: false,
        User: null,
        token: null // Add token to the state
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload; // Updates the `loading` state
        },
        setUser: (state, action) => {
            state.User = action.payload; // Updates the `User` state
        },
        setToken: (state, action) => {
            state.token = action.payload; // Updates the `token` state
        },
        clearAuth: (state) => {
            state.User = null; // Clear the user data
            state.token = null; // Clear the token
        }
    }
});

export const { setLoading, setUser, setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;

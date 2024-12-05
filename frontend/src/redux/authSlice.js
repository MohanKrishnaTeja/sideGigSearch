import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",                // Name of the slice
    initialState: { loading: false },  // Initial state of the slice
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;  // Updates the `loading` state
        }
    }
});


export const { setLoading } = authSlice.actions;
export default authSlice.reducer;

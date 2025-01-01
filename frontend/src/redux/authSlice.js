import { createSlice } from "@reduxjs/toolkit";

// Initial state structure
const initialState = {
  token: null,
  user: null, // Corrected the case to match the usage in components
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;  // Store the token
    },
    setUser: (state, action) => {
      console.log("Setting user:", action.payload);
      state.user = action.payload;  // Store the user data
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
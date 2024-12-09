import { createSlice } from "@reduxjs/toolkit";

// Initial state structure
const initialState = {
  token: null,
  User: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;  // Store the token
    },
    setUser: (state, action) => {
      state.User = action.payload;  // Store the user data
    },
    clearAuth: (state) => {
      state.token = null;
      state.User = null;
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;


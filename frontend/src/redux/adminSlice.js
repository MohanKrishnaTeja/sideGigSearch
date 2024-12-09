import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching admin jobs
export const fetchAdminJobs = createAsyncThunk("admin/fetchAdminJobs", async () => {
    const response = await axios.get("/api/admin/jobs");
    return response.data;
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        jobs: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminJobs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAdminJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = action.payload || [];
            })
            .addCase(fetchAdminJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

// Export the reducer as the default export
export default adminSlice.reducer;



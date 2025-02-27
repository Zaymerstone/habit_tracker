import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  tokenizedAxiosInstance,
} from "../../../app/api/axios-client";
import { ApiPath } from "../../../app/api/pathes";
import { AxiosError } from "axios";

export interface UserActivityStatistics {
  datetime: string; // e.g., "January 2024"
  activeUsers: number;
  avgHabitsPerUser: number;
}

export interface UserActivityStatisticsState {
  user_activity: UserActivityStatistics[];
  status: "loading" | "idle" | "failed";
  error: string | null;
}

const initialState: UserActivityStatisticsState = {
  user_activity: [],
  status: "idle",
  error: null,
};

// **Thunk to fetch personal statistics**
export const fetchUserActivityStatistics = createAsyncThunk(
    "user_activity/fetchUserActivityStatistics",
    async (period: string, { rejectWithValue }) => {
      try {
        const response = await tokenizedAxiosInstance.get(ApiPath.UserActivityData, {params: {period}});
  
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data || "Failed to fetch user activity statistics");
        }
      }
    }
  );


  export const userActivityStatisticsSlice = createSlice({
    name: "user_activity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserActivityStatistics.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchUserActivityStatistics.fulfilled, (state, action) => {
          state.user_activity = action.payload;
          state.status = "idle";
        })
        .addCase(fetchUserActivityStatistics.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        });
    },
  });
  
  export default userActivityStatisticsSlice.reducer;

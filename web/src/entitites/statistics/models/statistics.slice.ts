import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  tokenizedAxiosInstance,
} from "../../../app/api/axios-client";
import { ApiPath } from "../../../app/api/pathes";
import { AxiosError } from "axios";

export interface HabitStatistics {
  month: string; // e.g., "January 2024"
  actualCompletions: number;
  plannedCompletions: number;
}

export interface PersonalStatisticsState {
  statistics: HabitStatistics[];
  status: "loading" | "idle" | "failed";
  error: string | null;
}

const initialState: PersonalStatisticsState = {
  statistics: [],
  status: "idle",
  error: null,
};

// **Thunk to fetch personal statistics**
export const fetchPersonalStatistics = createAsyncThunk(
    "statistics/fetchPersonalStatistics",
    async (habitId: number, { rejectWithValue }) => {
      try {
        const response = await tokenizedAxiosInstance.get(ApiPath.PersonalCompletionData, {params: {habitId}});
  
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data || "Failed to fetch statistics");
        }
      }
    }
  );


  export const personalStatisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPersonalStatistics.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchPersonalStatistics.fulfilled, (state, action) => {
          state.statistics = action.payload;
          state.status = "idle";
        })
        .addCase(fetchPersonalStatistics.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        });
    },
  });
  
  export default personalStatisticsSlice.reducer;

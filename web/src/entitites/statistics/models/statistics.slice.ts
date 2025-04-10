import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenizedAxiosInstance } from "../../../app/api/axios-client";
import { ApiPath } from "../../../app/api/pathes";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface HabitStatistics {
  month: string; // e.g., "January 2024"
  actualCompletions: number;
  plannedCompletions: number;
}

export interface GlobalHabitStat {
  id: number;
  name: string;
  avgStreak: string;
  avgMaxStreak: string;
  userCount: number;
  userStreak: number;
  userMaxStreak: number;
  percentile: number;
}

export interface PersonalStatisticsState {
  statistics: HabitStatistics[];
  globalHabitStats: GlobalHabitStat[];
  status: "loading" | "idle" | "failed";
  globalStatsStatus: "loading" | "idle" | "failed";
  error: string | null;
}

const initialState: PersonalStatisticsState = {
  statistics: [],
  globalHabitStats: [],
  status: "idle",
  globalStatsStatus: "idle",
  error: null,
};

// **Thunk to fetch personal statistics**
export const fetchPersonalStatistics = createAsyncThunk(
  "statistics/fetchPersonalStatistics",
  async (
    { habitId, isGlobal = false }: { habitId: number; isGlobal?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await tokenizedAxiosInstance.get(
        ApiPath.PersonalCompletionData,
        { params: { habitId, isGlobal } }
      );

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch statistics"
        );
      }
    }
  }
);

// **Thunk to fetch global habit statistics**
export const fetchGlobalHabitStats = createAsyncThunk(
  "statistics/fetchGlobalHabitStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await tokenizedAxiosInstance.get(
        ApiPath.GlobalHabitStats
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Failed to fetch global habit statistics");
        return rejectWithValue(
          error.response?.data || "Failed to fetch global habit statistics"
        );
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
      })
      // Global habit stats cases
      .addCase(fetchGlobalHabitStats.pending, (state) => {
        state.globalStatsStatus = "loading";
      })
      .addCase(fetchGlobalHabitStats.fulfilled, (state, action) => {
        state.globalHabitStats = action.payload.globalHabitStats;
        state.globalStatsStatus = "idle";
      })
      .addCase(fetchGlobalHabitStats.rejected, (state, action) => {
        state.globalStatsStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export default personalStatisticsSlice.reducer;

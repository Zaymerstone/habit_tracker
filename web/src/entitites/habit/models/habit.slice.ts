import { createAsyncThunk } from "@reduxjs/toolkit";
import { tokenizedAxiosInstance } from "../../../app/api/axios-client";
import { ApiPath } from "../../../app/api/pathes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { AxiosError } from "axios";
import {
  CreateHabitPayload,
  UpdateHabitPayload,
} from "../../habit/types/habit.payload";
import { checkUser } from "../../user/models/user.slice";

export interface HabitData {
  id: number;
  name: string;
  max_streak: number;
  streak: number;
  days: number[];
  everyday: boolean;
  lastCompletion: string;
}

export const createHabit = createAsyncThunk(
  "habit/create",
  async (habitData: CreateHabitPayload, { rejectWithValue }) => {
    try {
      const response = await tokenizedAxiosInstance.post(
        ApiPath.CreateHabit,
        habitData
      );

      // Display a success toast
      toast.success("Habit created successfully!");

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const updateHabit = createAsyncThunk(
  "habit/update",
  async (habitData: UpdateHabitPayload, { rejectWithValue }) => {
    try {
      const response = await tokenizedAxiosInstance.post(
        ApiPath.UpdateHabit,
        habitData
      );

      // Display a success toast
      toast.success("Habit updated successfully!");

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const deleteHabit = createAsyncThunk(
  "habit/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await tokenizedAxiosInstance.delete(
        ApiPath.DeleteHabit,
        { data: { id } }
      );

      // Display a success toast
      toast.success("Habit deleted successfully!");

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const completeHabit = createAsyncThunk(
  "habit/complete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await tokenizedAxiosInstance.post(
        ApiPath.CompleteHabit,
        { id }
      );

      // Display a success toast
      toast.success("Habit completed successfully!");

      if (Object.keys(response.data.achievement).length > 0) {
        toast.success("Wow, got new achievement!");
      }

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const completeGlobalHabit = createAsyncThunk(
  "habit/completeGlobal",
  async (globalHabitId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await tokenizedAxiosInstance.post(
        ApiPath.CompleteGlobalHabit,
        { globalHabitId }
      );

      toast.success("Global habit completed successfully!");

      // Refresh user data to get updated global habits
      dispatch(checkUser());

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Show error message
        const errorMessage =
          error.response?.data?.message || "Failed to complete global habit";
        toast.error(errorMessage);

        return rejectWithValue(error.response?.data);
      }
    }
  }
);

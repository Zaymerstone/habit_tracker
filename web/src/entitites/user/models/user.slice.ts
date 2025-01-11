import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  axiosInstance,
  tokenizedAxiosInstance,
} from "../../../app/api/axios-client";
import { ApiPath } from "../../../app/api/pathes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { AxiosError } from "axios";
import { LoginUserPayload, RegisterUserPayload } from "../types/user.payload";

export interface HabitData {
  id: number;
  name: string;
  max_streak: number;
  streak: number;
}

export interface MasteryData {
  id: number;
  title: string;
  streak_target: number;
}

export interface AchievementData {
  userId: number;
  Habit: HabitData;
  Mastery: MasteryData;
  createdAt: string;
}

export interface UserState {
  email: string;
  level: number;
  habits: HabitData[];
  achievements: AchievementData[];
  error: string | null;
  status: "loading" | "idle" | "failed";
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: "",
  level: 0,
  habits: [],
  achievements: [],
  error: null,
  status: "idle",
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};
// САНКА

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ApiPath.Registration, userData);

      // Display a success toast
      toast.success("Registration successful!");

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

// THUNK CHECK USER
export const checkUser = createAsyncThunk(
  "user/checkUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await tokenizedAxiosInstance.get(ApiPath.CheckUser);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

// LOGIN THUNK

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData: LoginUserPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ApiPath.Login, loginData); //axios instance было

      toast.success(`Logged in as ${response.data.user.email}`);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.level = initialState.level;
      state.email = initialState.email;
      state.habits = initialState.habits;
      state.status = initialState.status;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        // registerUser -> action creator первый параметр в кейсе это всегда акшн креатор
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.level = action.payload.user.level;
        state.token = action.payload.token;
        state.status = action.payload.status;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // кейсы для логина
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.level = action.payload.user.level;
        state.token = action.payload.token;
        state.habits = action.payload.user.habits;
        state.status = "idle";
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.email = action.payload.user.email;
        state.habits = action.payload.user.habits;
        state.level = action.payload.user.level;
        state.achievements = action.payload.user.achievements;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default userSlice.reducer;
export const { logout } = userSlice.actions;

// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// export interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   //стартовая инфа
//   value: 0,
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state, action: PayloadAction<number>) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += action.payload;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;

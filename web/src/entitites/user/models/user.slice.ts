import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../app/api/axios-client";
import { ApiPath } from "../../../app/api/pathes";
import { toast } from "react-toastify";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  level: number;
  habits: string[];
  error: string | null;
  status: "loading" | "idle" | "failed";
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  level: 0,
  habits: [],
  error: null,
  status: "idle",
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};
// САНКА

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("user data: ", userData);
      const response = await axiosInstance.post(ApiPath.Registration, userData);
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.token = action.payload.token;
        state.status = action.payload.status;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default userSlice.reducer;

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

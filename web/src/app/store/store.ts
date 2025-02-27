import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../entitites/user/models/user.slice";
import personalStatisticsReducer from "../../entitites/statistics/models/statistics.slice"
import userActivityStatisticsReducer from "../../entitites/statistics/models/active_statistics.slice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    statistics: personalStatisticsReducer,
    user_activity: userActivityStatisticsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

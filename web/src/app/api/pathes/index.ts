export enum ApiPath {
  Login = "/auth/login", // pathes that lead to backend

  Registration = "/auth/register",

  CheckUser = "/auth/checkUser",

  СhangeAvatar = "/auth/changeAvatar",

  CreateHabit = "/habits/create",

  UpdateHabit = "/habits/update",

  DeleteHabit = "/habits/delete",

  CompleteHabit = "/habits/complete",

  PersonalCompletionData = "/statistics/get_personal_completion_data",

  UserActivityData = "/statistics/get_user_activity_data",

  CompleteGlobalHabit = "/global-habits/complete",

  GlobalHabitStats = "/global-habits/stats",
}

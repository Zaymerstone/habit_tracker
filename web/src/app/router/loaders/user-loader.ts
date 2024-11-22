import { checkUser } from "../../../entitites/user/models/user.slice";
import { store } from "../../store/store";

export async function userLoader() {
  try {
    await store.dispatch(checkUser()).unwrap();
    return { success: true }; // Data is loaded successfully
  } catch (error) {
    return { success: false, error }; // Handle errors
  }
}

import { RouterProvider } from "react-router-dom";
import { routerFactory } from "../models/router-factory";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { useEffect } from "react";
import { checkUser } from "../../../entitites/user/models/user.slice";

export default function AppRouter() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(checkUser());
    }
  }, [dispatch, isAuthenticated]);
  return <RouterProvider router={routerFactory()} />;
}

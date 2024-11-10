import { createBrowserRouter } from "react-router-dom";
import { RouterPath } from "../../shared/router/pathes";
import LoginPage from "../../../pages/login/ui/Login.page";
import RegisterPage from "../../../pages/registration/ui/Registration.page";
import HomePage from "../../../pages/home/ui/Home.page";
import ProfilePage from "../../../pages/profile/ui/Profile.page";

// define a routes using the createBrowserRouter component from react-dom library

export const routerFactory = () =>
  createBrowserRouter([
    //creating browser router from documentation new way of creating router
    {
      path: RouterPath.Root,
      children: [
        {
          path: RouterPath.Login, // path
          element: <LoginPage />, // component itself
        },
        {
          path: RouterPath.Registration,
          element: <RegisterPage />,
        },
        {
          path: RouterPath.HomePage,
          element: <HomePage />,
        },
        {
          path: RouterPath.UserProfile,
          element: <ProfilePage />,
        },
      ],
    },
  ]);

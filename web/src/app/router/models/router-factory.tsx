import { createBrowserRouter } from "react-router-dom";
import { RouterPath } from "../../shared/router/pathes";
import LoginPage from "../../../pages/login/ui/Login.page";
import RegisterPage from "../../../pages/registration/ui/Registration.page";
import HomePage from "../../../pages/home/ui/Home.page";
import ProfilePage from "../../../pages/profile/ui/Profile.page";
import ProtectedRoute from "../guards/protectedroute.guard";
import AuthenticatedLayout from "../components/authenticated-layout.comp";
import { userLoader } from "../loaders/user-loader";
import AuthenticatedRoute from "../guards/authenticatedroute.guard";

// define a routes using the createBrowserRouter component from react-dom library

export const routerFactory = () =>
  createBrowserRouter([
    //creating browser router from documentation new way of creating router
    {
      path: RouterPath.Root,
      children: [
        {
          path: RouterPath.Login, // path
          element:
            (<AuthenticatedRoute redirectTo={RouterPath.HomePage}>
              <LoginPage />
            </AuthenticatedRoute>)
        },
        {
          path: RouterPath.Registration,
          element:
            (<AuthenticatedRoute redirectTo={RouterPath.HomePage}>
              <RegisterPage />
            </AuthenticatedRoute>),
        },
        {
          path: RouterPath.Root,
          element:
            (<ProtectedRoute redirectTo={RouterPath.Login}>
              <AuthenticatedLayout />
            </ProtectedRoute>),
          children: [
            {
              path: RouterPath.HomePage,
              element: <HomePage />,
              loader: userLoader
            },
            {
              path: RouterPath.UserProfile,
              element: <ProfilePage />,
              loader: userLoader,
            },
          ],
        },
      ],
    },
  ]);

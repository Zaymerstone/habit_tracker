import { createBrowserRouter } from "react-router-dom";
import { RouterPath } from "../../shared/router/pathes";
import LoginPage from "../../../pages/login/ui/Login.page";
import RegisterPage from "../../../pages/registration/ui/Registration.page";
import HomePage from "../../../pages/home/ui/Home.page";
import ProfilePage from "../../../pages/profile/ui/Profile.page";
import ProtectedRoute from "../guards/protectedroute.guard";
import PrivateRoute from "../guards/privateroute.guard";
import AuthenticatedLayout from "../components/authenticated-layout.comp";

// define a routes using the createBrowserRouter component from react-dom library

export const routerFactory = () =>
  createBrowserRouter([
    //creating browser router from documentation new way of creating router
    {
      path: RouterPath.Root,
      children: [
        {
          path: RouterPath.Login, // path
          element: (
            <ProtectedRoute redirectTo={RouterPath.HomePage}>
              <LoginPage />
            </ProtectedRoute>
          ), // component itself
        },
        {
          path: RouterPath.Registration,
          element: (
            <ProtectedRoute redirectTo={RouterPath.HomePage}>
              <RegisterPage />
            </ProtectedRoute>
          ),
        },
        {
          element: <PrivateRoute redirectTo={RouterPath.Login} />,
          children: [
            {
              path: RouterPath.HomePage,
              element: <AuthenticatedLayout />,
              children: [
                {
                  path: "",
                  element: <HomePage />,
                },
              ],
            },
            {
              path: RouterPath.UserProfile,
              element: <AuthenticatedLayout />,
              children: [
                {
                  path: "",
                  element: <ProfilePage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

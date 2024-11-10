import { RouterProvider } from "react-router-dom";
import { routerFactory } from "../models/router-factory";

export default function AppRouter() {
  return <RouterProvider router={routerFactory()} />;
}

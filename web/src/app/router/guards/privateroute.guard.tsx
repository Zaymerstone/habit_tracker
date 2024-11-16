import { useAppSelector } from "../../shared/hooks/redux";
import { Navigate, Outlet } from "react-router-dom";
interface PrivateRouteProps {
  redirectTo: string;
}
export default function PrivateRoute({ redirectTo }: PrivateRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

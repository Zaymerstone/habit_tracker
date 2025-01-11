import { ReactNode } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  redirectTo: string;
  children: ReactNode; //react node = component
}
export default function ProtectedRoute({
  children,
  redirectTo,
}: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
}

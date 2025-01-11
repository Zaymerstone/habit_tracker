import { ReactNode } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { Navigate, Outlet } from "react-router-dom";
interface AuthenticatedRouteProps {
  redirectTo: string;
  children: ReactNode;
}
export default function AuthenticatedRoute({ redirectTo, children }: AuthenticatedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : children;
}

import { Navigate, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;

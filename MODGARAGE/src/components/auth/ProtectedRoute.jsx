
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated guests to login, saving their previous path in state to return to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

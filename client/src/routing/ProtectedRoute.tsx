import Spinner from "react-bootstrap/esm/Spinner";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../store/features/auth/authSlice";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = () => {
  const {authLoading, isAuthenticated} = useAppSelector(selectAuth)

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return isAuthenticated ? <Outlet /> : <Navigate to=".." />;
};

export default ProtectedRoute;

import { useContext } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { AuthStateType } from "../types";

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext) as AuthStateType;

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return isAuthenticated ? <Outlet /> : <Navigate to=".." />;
};

export default ProtectedRoute;

import { useContext } from "react";
import { SContainer } from "../../styles/Auth/Login/Login";
import ImageBackground from "../../components/Auth/Login/ImageBackground";
import LoginForm from "../../components/Auth/Login/LoginForm";
import NavbarMenu from "../../components/Auth/Login/NavbarMenu";
import { AuthContext } from "../../contexts/authContext";
import { AuthStateType } from "../../types";
import Spinner from "react-bootstrap/esm/Spinner";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext) as AuthStateType;

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );

  else if (isAuthenticated) return <Navigate to='t' />

  else body = (
    <>
      <NavbarMenu />
      <SContainer>
        <LoginForm />
        <ImageBackground />
      </SContainer>
    </>
  )

  return (
    <>
    {body}
    </>
  );
};

export default Login;

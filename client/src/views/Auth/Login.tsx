import { SContainer, SSContainer } from "../../styles/Auth/Login/Login";
import ImageBackground from "../../components/Auth/Login/ImageBackground";
import LoginForm from "../../components/Auth/Login/LoginForm";
import NavbarMenu from "../../components/Auth/Login/NavbarMenu";
import { AuthStateType } from "../../types";
import Spinner from "react-bootstrap/esm/Spinner";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/features/auth/authSlice";

const Login = () => {
  const {authLoading, isAuthenticated} = useAppSelector(selectAuth)

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );

  else if (isAuthenticated) return <Navigate to='t' />

  else body = (
    <SSContainer>
      <NavbarMenu />
      <SContainer>
        <LoginForm />
        <ImageBackground />
      </SContainer>
    </SSContainer>
  )

  return (
    <>
    {body}
    </>
  );
};

export default Login;

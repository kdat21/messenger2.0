import { Navigate } from "react-router-dom";
import messengerLogo from "../../assets/messenger-logo.svg";
import { SContainer, SImageWrapper } from "../../styles/Auth/Auth";
import Identify from "../../components/Auth/Identify";
import NotFound from "../../components/Auth/NotFound";
import Register from "../../components/Auth/Register";
import ResetPassword from "../../components/Auth/ResetPassword";
import Verification from "../../components/Auth/Verification";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { AuthStateType } from "../../types";
import Spinner from "react-bootstrap/esm/Spinner";

const Auth = ({bodyType}: {bodyType: string}) => {
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
  else if (isAuthenticated) return <Navigate to="/t" />;
  else {
    switch (bodyType) {
      case "register":
        body = <Register />;
        break;

      case "verify":
        body = <Verification />;
        break;

      case "identify":
        body = <Identify />;
        break;

      case "resetpassword":
        body = <ResetPassword />;
        break;

      default:
        body = <NotFound />;
        break;
    }
  }

  return (
    <SContainer>
      <SImageWrapper>
        <img src={messengerLogo} alt="messengerLogo" width="128" height="128" />
      </SImageWrapper>
      {body}
    </SContainer>
  );
};

export default Auth;

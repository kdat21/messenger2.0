import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import {
  SButton,
  SContainer,
  SSecondText,
  SText,
} from "../../styles/Auth/Verify";
import { AuthStateType } from "../../types";

const Verification = () => {
  // Params
  const { userId, verifyString } = useParams();

  // Context
  const { verifyUser } = useContext(AuthContext) as AuthStateType;

  // Local state
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    verify(userId!, verifyString!);
  }, []);

  const verify = async (userId: string, verifyString: string) => {
    try {
      const verifyData = await verifyUser(userId!, verifyString!);

      setMessage(verifyData.message);
      setSuccess(verifyData.success);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SContainer>
      <SText>Verification</SText>
      <SSecondText $success={success}>{message}</SSecondText>
      <Link to="/">
        <SButton $success={success}>
          Return to messenger.com {success ? " to login" : ""}
        </SButton>
      </Link>
    </SContainer>
  );
};

export default Verification;

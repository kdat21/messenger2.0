import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyUser } from "../../store/features/auth/authSlice";
import {
  SButton,
  SContainer,
  SSecondText,
  SText,
} from "../../styles/Auth/Verify";

const Verification = () => {
  // Params
  const { userId, verifyString } = useParams();

  // Local state
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    verify(userId!, verifyString!);
  }, []);

  const verify = async (userId: string, verifyString: string) => {
    try {
      const verifyData = await verifyUser({userId, verifyString});

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

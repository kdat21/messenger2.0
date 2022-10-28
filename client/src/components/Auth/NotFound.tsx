import { Link } from "react-router-dom";
import {
  SButton,
  SContainer,
  SImageWrapper,
  SSecondText,
  SText,
} from "../../styles/NotFound";
import messengerLogo from "../../assets/messenger-logo.svg";

const NotFound = () => {
  return (
    <SContainer>
      <SImageWrapper>
        <img src={messengerLogo} alt="messengerLogo" width="128" height="128" />
      </SImageWrapper>
      <SText>This Page isn't available</SText>
      <SSecondText>
        The link that you followed may be broken or the Page may have been
        removed.
      </SSecondText>
      <Link to="/">
        <SButton>Return to messenger.com</SButton>
      </Link>
    </SContainer>
  );
};

export default NotFound;

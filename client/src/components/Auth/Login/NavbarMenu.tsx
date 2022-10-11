import messengerLogo from "../../../assets/messenger-logo.svg";
import Navbar from "react-bootstrap/esm/Navbar";
import { SImageWrapper } from "../../../styles/Auth/Login/Login";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  return (
    <>
      <Navbar expand="lg" bg="light" variant="light" className="shadow">
        <Navbar.Brand as={Link} to="/">
          <SImageWrapper>
            <img
              src={messengerLogo}
              alt="messengerLogo"
              width="40"
              height="40"
            />
          </SImageWrapper>
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavbarMenu;

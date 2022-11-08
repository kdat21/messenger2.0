import messengerLogo from "../../../assets/messenger-logo.svg";
import settingLogo from "../../../assets/gear-icon.svg";
import Navbar from "react-bootstrap/esm/Navbar";
import { SImageWrapper } from "../../../styles/Auth/Login/Login";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  selectTheme,
  setTheme,
} from "../../../store/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SNavDropdown, SSVG } from "../../../styles/Dashboard/Sidebar";
import { useTheme } from "@mui/material/styles";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const NavbarMenu = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnChangeTheme = (themeName: string) => {
    dispatch(setTheme(themeName));
    handleClose();
  };

  return (
    <>
      <Navbar className="shadow">
        <Navbar.Brand as={Link} to="/" className="me-auto">
          <SImageWrapper>
            <img
              src={messengerLogo}
              alt="messengerLogo"
              width="40"
              height="40"
            />
          </SImageWrapper>
        </Navbar.Brand>
        <Nav>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Change Theme
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleOnChangeTheme("light")}>
              Light
            </MenuItem>
            <MenuItem onClick={() => handleOnChangeTheme("dark")}>
              Dark
            </MenuItem>
            <MenuItem onClick={() => handleOnChangeTheme("halloween")}>
              Halloween
            </MenuItem>
            <MenuItem onClick={() => handleOnChangeTheme("christmas")}>
              Christmas
            </MenuItem>
          </Menu>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavbarMenu;

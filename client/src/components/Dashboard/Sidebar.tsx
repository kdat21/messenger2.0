import "../../styles/Dashboard/sidebar.scss";
import { MouseEvent, useEffect } from "react";
import chatLogo from "../../assets/chat-logo.svg";
import peopleLogo from "../../assets/people-logo.svg";
import logOutIcon from "../../assets/log-out-logo.svg";
import gearIcon from "../../assets/gear-icon.svg";
import {
  SButton,
  SCollapseIcon,
  SNavDropdown,
  SNav,
  SNavbar,
  SNavLink,
  SSVG,
} from "../../styles/Dashboard/Sidebar";
import { ToggleSidebarProps } from "../../types";
import { Avatar, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser, selectAuth } from "../../store/features/auth/authSlice";
import { getPeople } from "../../store/features/people/peopleSlice";
import { selectTheme, setTheme } from "../../store/features/theme/themeSlice";
import { Dropdown, DropdownButton } from "react-bootstrap";

const NavbarMenu = ({ isOpen, toggleSidebar }: ToggleSidebarProps) => {
  // State
  const { user } = useAppSelector(selectAuth);
  const { themeMode } = useAppSelector(selectTheme);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeople());
  }, []);

  const handleOnChangeTheme = (themeName: string) => {
    dispatch(setTheme(themeName));
  };

  return (
    <SNavbar $isopen={isOpen} $borderColor={theme.palette.divider}>
      <SNav variant="pills" className="flex-column mb-auto">
        <SNavLink
          $textColor={theme.palette.text.primary}
          $backgroundColor={theme.palette.action.hover}
          to="/t"
          className={isOpen ? "" : "justify-content-center"}
          children={({ isActive }) => {
            const color = isActive
              ? theme.palette.primary.main
              : theme.palette.primary.light;
            return (
              <>
                <SSVG color={color} src={chatLogo} $isopen={isOpen} />
                {isOpen ? "Chat" : ""}
              </>
            );
          }}
        />
        <SNavLink
          $textColor={theme.palette.text.primary}
          $backgroundColor={theme.palette.action.hover}
          to="/active"
          className={isOpen ? "" : "justify-content-center"}
          children={({ isActive }) => {
            const color = isActive
              ? theme.palette.primary.main
              : theme.palette.primary.light;
            return (
              <>
                <SSVG color={color} src={peopleLogo} $isopen={isOpen} />
                {isOpen ? "People" : ""}
              </>
            );
          }}
        />
      </SNav>

      <SNav $isopen={isOpen}>
        <SNavDropdown
          title={
            <div className="avatar">
              <Avatar sx={{ width: 40, height: 40 }} className="me-2">
                {user?.username[0].toUpperCase()}
              </Avatar>
              {isOpen ? user?.username : ""}
            </div>
          }
          drop="up"
          className="me-auto"
          $isopen={isOpen}
          $dropdownMenuColor={theme.palette.background.default}
          $textColor={theme.palette.text.primary}
          $itemColor={theme.palette.action.hover}
        >
          <SNavDropdown.Item className='change-theme'>
          <SSVG
              color={theme.palette.primary.main}
              src={gearIcon}
              className="me-1"
            />
            <Dropdown className='change-theme-toggle'>
              <li className="sub-menu2">
                <a
                  href="#"
                  className="dropdown-item dropdown-toggle our-pick-2"
                  data-toggle="dropdown"
                >
                  Change Theme
                </a>
                <ul className="dropdown-menu our-pick-menu">
                  <li onClick={() => handleOnChangeTheme("light")}>
                    <a href="#" className="dropdown-item">
                      Light
                    </a>
                  </li>
                  <li onClick={() => handleOnChangeTheme("dark")}>
                    <a href="#" className="dropdown-item">
                      Dark
                    </a>
                  </li>
                  <li onClick={() => handleOnChangeTheme("halloween")}>
                    <a href="#" className="dropdown-item">
                      Halloween
                    </a>
                  </li>
                  <li onClick={() => handleOnChangeTheme("christmas")}>
                    <a href="#" className="dropdown-item">
                      Christmas
                    </a>
                  </li>
                </ul>
              </li>
            </Dropdown>
          </SNavDropdown.Item>
          <SNavDropdown.Item>
            <SSVG
              color={theme.palette.primary.main}
              src={gearIcon}
              className="me-1"
            />
            Change Account Infomation
          </SNavDropdown.Item>
          <SNavDropdown.Divider />
          <SNavDropdown.Item
            className="text-danger"
            onClick={() => dispatch(logoutUser())}
          >
            <img src={logOutIcon} alt="logOutIcon" className="me-1" />
            Log Out
          </SNavDropdown.Item>
        </SNavDropdown>
        <SButton className="shadow-none" onClick={toggleSidebar}>
          <SCollapseIcon $isopen={isOpen} />
        </SButton>
      </SNav>
    </SNavbar>
  );
};

export default NavbarMenu;

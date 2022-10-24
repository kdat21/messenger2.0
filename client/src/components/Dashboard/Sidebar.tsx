import { useEffect } from "react";
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
import {
  AuthStateType,
  PeopleStateType,
  ToggleSidebarProps,
} from "../../types";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser, selectAuth } from "../../store/features/auth/authSlice";
import { getPeople } from "../../store/features/people/peopleSlice";

const NavbarMenu = ({ isOpen, toggleSidebar }: ToggleSidebarProps) => {
  // State
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeople());
  }, []);

  return (
    <SNavbar className="bg-white" $isopen={isOpen}>
      <SNav variant="pills" className="flex-column mb-auto">
        <SNavLink
          to="/t"
          className={isOpen ? "" : "justify-content-center"}
          children={({ isActive }) => {
            const color = isActive ? "black" : "";
            return (
              <>
                <SSVG color={color} src={chatLogo} $isopen={isOpen} />
                {isOpen ? "Chat" : ""}
              </>
            );
          }}
        />
        <SNavLink
          to="/active"
          className={isOpen ? "" : "justify-content-center"}
          children={({ isActive }) => {
            const color = isActive ? "black" : "";
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
              {isOpen ? user!.username : ""}
            </div>
          }
          drop="up"
          className="me-auto"
          $isopen={isOpen}
        >
          <SNavDropdown.Item>
            <img src={gearIcon} alt="logOutIcon" className="me-1" />
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

import styled from "styled-components";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";
import SVG from "react-inlinesvg";
import Button from "react-bootstrap/esm/Button";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const SNavbar = styled(Navbar)`
  display: flex;
  flex-direction: column;
  font-family: inherit;
  font-weight: 500;
  color: black;
  height: 100vh;
  min-width: ${(props) => (props.$isopen ? "210px" : "60px")};
  max-width: ${(props) => (props.$isopen ? "210px" : "60px")};
  border-right: 2px solid ${(props) => props.$borderColor};
  align-items: flex-start;
`;

export const SNav = styled(Nav)`
  display: ${(props) => (props.$isopen ? "" : "block")};
  padding: 8px;
  width: 100%;

  align-items: center;

  .avatar {
    display: flex;
    align-items: center;
  }
`;

interface SNavLinkProps {
  $textColor: string;
  $backgroundColor: string;
}

export const SNavLink = styled(NavLink)<SNavLinkProps>`
  display: flex;
  align-items: center;
  color: ${(props) => props.$textColor};
  height: 34px;
  border-radius: 5px;
  text-decoration: none;
  :hover {
    background-color: ${(props) => props.$backgroundColor};
    color: ${(props) => props.$textColor};
  }

  :focus {
    background-color: ${(props) => props.$backgroundColor};
  }
`;

interface SVGProps {
  color: string;
  $isopen?: boolean;
}

export const SSVG = styled(SVG)<SVGProps>`
  margin-right: ${(props) => (props.$isopen ? "8px" : "0px")};
  & path {
    fill: ${({ color }) => color};
  }
`;

export const SNavDropdown = styled(NavDropdown)`
  /* background-color: white; */
  border-radius: 5px;

  /* :hover {
    background-color: #f5f5f5;
  } */

  .dropdown-toggle {
    ${(props) => (props.$isopen ? "" : "padding: 8px 0px 8px 0px !important")};
  }

  .dropdown-menu {
    background-color: ${(props) => props.$dropdownMenuColor};
  }

  .dropdown-toggle::after {
    display: none !important;
  }

  .dropdown-divider {
    margin: 8px 15px 8px 15px;
  }

  .dropdown-item {
    border-radius: 5px;
    font-weight: 600;
    color: ${(props) => props.$textColor};
    align-items: center;
    justify-content: center;

    :hover {
      background-color: ${(props) => props.$itemColor};
    }

    :active {
      background-color: ${(props) => props.$itemColor};
      color: ${(props) => props.$textColor};
    }
  }
`;

export const SButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  :hover,
  :focus {
    background-color: #e9e9e9;
  }

  :active {
    background-color: #c4c4c4;
  }
`;

interface OpenProps {
  $isopen: boolean;
}

export const SCollapseIcon = styled.i<OpenProps>`
  background-image: url("https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/8eW70nFz7M7.png");
  background-position: 0px ${(props) => (props.$isopen ? "-1942px" : "-1959px")};
  background-size: auto;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  display: inline-block;
`;

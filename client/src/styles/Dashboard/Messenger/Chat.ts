import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

interface Props {
  $borderColor: string
}

export const SContainer = styled.div<Props>`
  display: flex;
  align-items: center;

  min-height: 60px;
  margin-top: auto;
  border-top: 2px solid ${(props) => props.$borderColor};
`;

export const SForm = styled(Form)`
  display: flex;
  width: 100%;
  .form-control {
    align-items: center;
    margin: 0px 0px 0px 20px;
    padding: 8px 8px 8px 12px;
    height: 35px;
    width: 100%;
    border: none;
    font-size: 14px;
    border-radius: 50px;
    background-color: ${(props) => props.$backgroundColor};
  }
`;

export const SButton = styled(Button)`
display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 15px 0px 15px;
  border: none;
  border-radius: 100%;
  width: 35px;
  background-color: ${(props) => props.$backgroundColor};

  :hover {
    background-color: ${(props) => props.$backgroundHover};
  }

  :focus {
    background-color: ${(props) => props.$backgroundFocus};
  }
`;

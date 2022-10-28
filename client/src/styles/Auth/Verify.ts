import { Button } from "react-bootstrap";
import styled from "styled-components";

interface SuccessProp {
    $success: boolean;
}

export const SContainer = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SText = styled.div`
  color: rgba(0, 0, 0, 1);
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const SSecondText = styled.div<SuccessProp>`
  color: ${(props) => (props.$success ? "green" : "red")};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const SButton = styled(Button)`
  margin-top: 60px;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => (props.$success ? "#ff5c87" : "#0a7cff")};
  border: none;
  border-radius: 24px;
  font-size: 16px;
  width: 240px;
  height: 50px;
  line-height: 19px;
  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
  :hover {
    background-color: #4d4dff;
  }
`;
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SImageWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const SText = styled.div`
  color: rgba(0, 0, 0, 1);
  font-size: 40px;
  font-weight: 300;
`;

export const SSecondText = styled.div`
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 10px;
`;

export const SRegisterForm = styled(Form)`
  width: 350px;
  text-align: center;
  .form-control {
    border: 1px solidrgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 16px;
    height: 36px;
  }
`;

export const SRegisterButton = styled(Button)`
  margin-top: 10px;
  justify-content: center;
  text-align: center;
  background-color: #0a7cff;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  width: 80px;
  height: 40px;
  line-height: 19px;
  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
  :hover {
    background-color: #4d4dff;
  }
`;

export const SLoginButton = styled(Button)`
  margin-left: 8px;
  justify-content: center;
  text-align: center;
  background-color: #ff5c87;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  width: 80px;
  height: 40px;
  line-height: 19px;
  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
  :hover {
    background-color: #FF7061;
  }
`;

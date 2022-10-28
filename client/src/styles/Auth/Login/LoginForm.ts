import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import styled from "styled-components";

export const SLoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  width: 440px;
  font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial,
    Lucida Grande, sans-serif;
`;

export const SLoginFormText = styled.div`
  background-image: linear-gradient(
    83.84deg,
    #0088ff -6.87%,
    #a033ff 26.54%,
    #ff5c87 58.58%
  );
  font-size: 90px;
  letter-spacing: -4px;
  line-height: 100px;
  margin-bottom: 10px;
  text-align: left;
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  font-weight: 600;
  padding: 0 0 8px;
  word-break: break-word;
`;

export const SLoginFormSecondaryText = styled.div`
  text-align: left;
  color: #595959;
  margin: 0 0 38px;
  max-width: unset;
  font-size: 20px;
  word-break: keep-all;
  word-wrap: break-word;
  line-height: 1.34;
`;

export const SLoginForm = styled(Form)`
  margin: 4px 0 4px 0;
  .form-control {
    background: rgba(0, 0, 0, 0.04);
    border: none;
    border-radius: 10px;
    font-size: 16px;
    height: 36px;
  }
`;

export const SLoginButton = styled(Button)`
  margin-right: 1em;
  justify-content: center;
  background-color: #0a7cff;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
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

export const SRegisterButton = styled(Button)`
  justify-content: center;
  background-color: #ff5c87;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  height: 40px;
  line-height: 19px;
  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
  :hover {
    background-color: #FF7061;
  }
`;

import styled from "styled-components";
import { Button } from "react-bootstrap";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: inherit;
  font-weight: 500;
  color: black;
  height: 100vh;
  min-width: 460px;
  max-width: 460px;
  border-right: 2px solid whitesmoke;
`;

export const SHeader = styled.div`
  display: flex;
  margin: 10px 20px 10px 30px;
  font-family: inherit;
  font-size: 25px;
  font-weight: 1000;
  height: 50px;
  justify-content: space-between;
  align-items: center;
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

export const SSearch = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 20px 10px 20px;
  padding: 8px 8px 8px 12px;
  border-radius: 50px;
  background-color: #f5f5f5;
`;

export const SSearchInput = styled.input`
  margin-left: 5px;
  outline: none;
  border: none;
  flex: 1;
  background-color: inherit;
`;

export const SConversationSelect = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-grow: 1;
`;

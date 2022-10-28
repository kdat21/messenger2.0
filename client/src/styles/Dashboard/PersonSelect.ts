import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  word-break: break-all;

  :hover {
    background-color: #f2f2f2;
  }
`;

export const SRecipientText = styled.div`
  font-weight: 600;
`;
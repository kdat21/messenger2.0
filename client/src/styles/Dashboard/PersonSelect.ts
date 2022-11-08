import styled from "styled-components";

interface Props {
  $backgroundColor: string;
}

export const SContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  word-break: break-all;

  :hover {
    background-color: ${(props) => props.$backgroundColor};
  }
`;

export const SRecipientText = styled.div`
  font-weight: 600;
`;
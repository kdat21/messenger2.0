import styled from "styled-components";

interface SenderProps {
  $sender: boolean;
}

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  overflow-y: scroll;
  flex-grow: 1;
  width: inherit;
  padding: 15px;
`;

export const SMessageContentContainer = styled.div<SenderProps>`
  display: flex;
  align-items: center;
  padding: 8px 15px 8px 15px;
  margin: 1px 0px 1px 0px;
  max-width: 75%;
  align-self: ${(props) => (props.$sender ? "flex-end" : "flex-start")};
  border-radius: 18px 18px 18px 18px;
  background-color: ${(props) => (props.$sender ? "#0084FF" : "#E4E6EB")};
  color: ${(props) => (props.$sender ? "white" : "black")};
  word-break: break-word;
  line-height: normal;
`;

export const SToolTip = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 12px 0px 12px;
  border-radius: 7px;
  height: 36px;
  background-color: #323436;
  color: #e4e6eb;
  font-size: 12px;
`;

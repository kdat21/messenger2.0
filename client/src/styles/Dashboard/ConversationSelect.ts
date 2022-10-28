import styled from "styled-components";

interface FocusProps {
  $focus: boolean;
}

export const SContainer = styled.div<FocusProps>`
  display: flex;
  align-items: center;
  height: 70px;
  cursor: pointer;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  word-break: break-all;
  background-color: ${(props) => (props.$focus ? "#f2f2f2" : "")};

  :hover {
    background-color: #f2f2f2;
  }
`;

export const STextContainer = styled.div`
  flex-direction: column;
  justify-content: flex-end;
`;

export const SRecipientText = styled.div`
  font-weight: 600;
`;

export const SSecondaryText = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 200;
  opacity: 0.6;
`;

export const SConversationInfo = styled.div`
  text-overflow: ellipsis;
  max-width: 350px;
  white-space: nowrap;
  overflow: hidden;
`;

export const SDot = styled.div`
  margin: 0px 3px 0px 3px;
  line-height: 16px;
  font-weight: 600;
`;
export const STime = styled.div`
  font-weight: 200;
`;

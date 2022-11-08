import styled from "styled-components";

interface Props {
  $borderColor: string
}

export const SContainer = styled.div<Props>`
  display: flex;
  min-height: 60px;
  border-bottom: 2px solid ${(props) => props.$borderColor};
`;

export const SConversationName = styled.div`
  margin: 12px 10px 0px 10px;
  font-weight: 600;
`
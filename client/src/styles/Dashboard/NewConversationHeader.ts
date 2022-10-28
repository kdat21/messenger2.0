import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 60px;
  max-height: 60px;
  border-bottom: 2px solid whitesmoke;
`;

export const SAutocomplete = styled(Autocomplete)`
  width: 100%;
`;

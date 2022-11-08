import { createTheme } from "@mui/material/styles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "../../../types";
import { RootState } from "../../store";
import { christmasTheme, darkTheme, halloweenTheme, lightTheme } from "./themeStore";

export const convertTheme = (themeMode: string) => {
  switch (themeMode) {
    case "light":
      return lightTheme;

    case "dark":
      return darkTheme;

    case 'halloween':
      return halloweenTheme;
    
    case 'christmas':
      return christmasTheme;

    default:
      return lightTheme;
  }
};

const initialState: ThemeState = {
  themeMode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;

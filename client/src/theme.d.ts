import { CSSProperties } from 'react';

declare module "@mui/material/styles" {
  interface PaletteOptions {
    message: {
        sender: {
          backgroundColor: CSSProperties['color'];
          color: CSSProperties['color'];
        };
        receiver: {
          backgroundColor: CSSProperties['color'];
          color: CSSProperties['color'];
        };
      };
  }
  interface Palette {
    message: {
        sender: {
          backgroundColor: string;
          color: string;
        };
        receiver: {
          backgroundColor: string;
          color: string;
        };
      };
  }
}

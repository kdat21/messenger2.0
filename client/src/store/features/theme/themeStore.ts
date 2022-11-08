import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
        main: '#0a7cff',
        light: '#3b96ff',
        dark: '#4d4dff'
    },
    secondary: {
        main: '#ff5c87',
        light: '#ff7c9f',
        dark: '#FF7061',
    },
    divider: "whitesmoke",
    message: {
      sender: {
        backgroundColor: "#0084FF",
        color: "white",
      },
      receiver: {
        backgroundColor: "#E4E6EB",
        color: "black",
      },
    },
  },
  typography: {
    button: {
      fontWeight: 700,
    },    
  },  
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
        main: '#0a7cff',
        light: '#3b96ff',
        dark: '#4d4dff'
    },
    secondary: {
        main: '#ff5c87',
        light: '#ff7c9f',
        dark: '#FF7061',
    },
    message: {
      sender: {
        backgroundColor: "#0084FF",
        color: "white",
      },
      receiver: {
        backgroundColor: "#3E4042",
        color: "white",
      },
    },
  },
  typography: {
    button: {
      fontWeight: 700,
    },    
  },  
});

export const halloweenTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
        main: '#F05622',
        light: '#f3774e',
        dark: '#F4E6C0',
        contrastText: 'fff'
    },
    secondary: {
        main: '#6E346B',
        light: '#8b5c88',
        dark: '#E4AF35',
        contrastText: 'fff'
    },
    background: {
      paper: "#150201",
      default: "#150201",
    },
    message: {
      sender: {
        backgroundColor: "#F05622",
        color: "white",
      },
      receiver: {
        backgroundColor: "#6E346B",
        color: "white",
      },
    },
  },
  typography: {
    button: {
      fontWeight: 700,
    },    
  },  
});

export const christmasTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
          main: '#C9040B',
          light: '#d3363b',
          dark: '#FC1934',
          contrastText: '#fff'
      },
      secondary: {
          main: '#28560B',
          light: '#8b5c88',
          dark: '#29A583',
          contrastText: '#fff'
      },
      message: {
        sender: {
          backgroundColor: "#C9040B",
          color: "white",
        },
        receiver: {
          backgroundColor: "#28560B",
          color: "white",
        },
      },
    },
    typography: {
      button: {
        fontWeight: 700,
      },    
    },  
  });
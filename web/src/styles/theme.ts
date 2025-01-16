import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b5998", // Darkish blue (adjust as needed)
    },
    secondary: {
      main: "#f5f5f5", // Light gray for contrast
    },
    background: {
      default: "#E8F9FF", // Background similar to `gray.700`
      paper: "#34495e", // Slightly lighter shade for cards
    },
    text: {
      primary: "#ffffff", // White for primary text
      secondary: "#bdc3c7", // Gray for secondary text
    },
    error: {
      main: "#e74c3c", // Red for error buttons
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h5: {
      color: "#ecf0f1", // Headings in light gray
    },
    body1: {
      color: "#ecf0f1", // General text in light gray
    },
    body2: {
      color: "#95a5a6", // Muted secondary text
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#34495e", // Darker card background
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
        containedPrimary: {
          backgroundColor: "#3b5998",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#2c3e50",
          },
        },
        outlinedError: {
          color: "#e74c3c",
          borderColor: "#e74c3c",
          "&:hover": {
            backgroundColor: "rgba(231, 76, 60, 0.1)",
          },
        },
      },
    },
  },
});

export default theme;

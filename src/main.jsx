import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: 4,
        },
      },
    },
  },
  typography: {
    h1: { fontSize: 55, marginTop: 15, marginBottom: 15 },
    h2: { fontSize: 34 },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#EA5E57",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

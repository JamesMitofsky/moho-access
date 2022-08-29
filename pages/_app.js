import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "../styles/global.css";

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
    h1: { fontSize: 40, fontWeight: 500, marginTop: 15, marginBottom: 15 },
    h2: { fontSize: 30, fontWeight: 200 },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#EA5E57",
    },
  },
});
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />{" "}
    </ThemeProvider>
  );
}

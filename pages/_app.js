import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import "../styles/global.css";
import Footer from "../components/Footer";
import { AppWrapper } from "../context/state";

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
      <AppWrapper>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Component {...pageProps} />
        </Container>
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
}

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@material-ui/core";
import "@fontsource/antonio";
import "@fontsource/roboto";

import "../styles/global.css";
import Footer from "../components/Footer";
import { AppWrapper } from "../context/state";
import Head from "next/head";
import { useRouter } from "next/router";

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
    fontFamily: ['"Antonio"', "Roboto"].join(","),
    fontSize: 16,
    h1: {
      fontFamily: '"Roboto"',
      fontSize: 40,
      fontWeight: 500,
      marginTop: 15,
      marginBottom: 15,
    },
    h2: { fontFamily: '"Roboto"', fontSize: 26, fontWeight: 200 },
    h3: { fontFamily: '"Roboto"', fontSize: 24, fontWeight: 200 },
    body1: { fontFamily: '"Roboto"', fontSize: 16, fontWeight: 200 },
    subtitle1: { fontSize: 14, color: "grey" },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#EA5E57",
    },
  },
});

export default function App({ Component, pageProps }) {
  // determine if admin directory for theming purposes
  const router = useRouter();
  const pathName = router.pathname;
  const isAdmin = pathName.includes("admin");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <meta name="application-name" content="Moho Access" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Moho Access" />
        <meta
          name="description"
          content="Pour accéder à l’espace résident à Moho.👍"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}

        <meta name="msapplication-TileColor" content="#ea5e57" />
        {isAdmin ? (
          <meta name="theme-color" content="#ea5e57" />
        ) : (
          <meta name="theme-color" content="#ffffff" />
        )}
        <meta name="msapplication-tap-highlight" content="no" />

        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/icons/icon-256x256.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://moho-access.vercel.app" />
        <meta name="twitter:title" content="Moho Access" />
        <meta
          name="twitter:description"
          content="Pour accéder à l’espace résident à Moho.👍"
        />
        <meta
          name="twitter:image"
          content="https://moho-access.vercel.app/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@joinMoHo" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Moho Access" />
        <meta
          property="og:description"
          content="Pour accéder à l’espace résident à Moho.👍"
        />
        <meta property="og:site_name" content="Moho Access" />
        <meta property="og:url" content="https://moho-access.vercel.app" />
      </Head>
      <AppWrapper>
        <Component {...pageProps} />
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
}

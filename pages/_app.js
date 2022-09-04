import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../styles/global.css";
import Footer from "../components/Footer";
import { AppWrapper } from "../context/state";
import Head from "next/head";

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
    subtitle1: { fontSize: 13, fontWeight: 200 },
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
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <meta name="application-name" content="Moho Auth" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Moho Auth" />
        <meta
          name="description"
          content="Making authenticating into the Moho resident space simple, scalable, and secure. 👍"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
        <meta name="msapplication-TileColor" content="#ea5e57" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://moho-auth.vercel.app" />
        <meta name="twitter:title" content="Moho Auth" />
        <meta
          name="twitter:description"
          content="Making authenticating into the Moho resident space simple, scalable, and secure. 👍"
        />
        <meta
          name="twitter:image"
          content="https://moho-auth.vercel.app/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Moho Auth" />
        <meta
          property="og:description"
          content="Making authenticating into the Moho resident space simple, scalable, and secure. 👍"
        />
        <meta property="og:site_name" content="Moho Auth" />
        <meta property="og:url" content="https://moho-auth.vercel.app" />
        <meta
          property="og:image"
          content="https://moho-auth.vercel.app/icons/apple-touch-icon.png"
        />
      </Head>
      <AppWrapper>
        <Component {...pageProps} />
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
}

import WelcomeText from "../components/WelcomeText.jsx";
import Login from "../components/Login.jsx";

import { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useAppContext } from "../context/state";
import Router from "next/router";

export default function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const user = useAppContext();
  useEffect(() => {
    // if user has been checked for but does not exist

    // has user been evaluated by state.js?
    if (!user) return;

    // has state.js determined no user is logged in?
    const notLoggedIn = user === "empty";
    if (notLoggedIn) {
      setPageLoaded(true);
      return;
    }
    // has state.js determined user is authorized to access QR codes?
    if (user.authorized) {
      Router.push("/Access");
    }
  }, [user]);

  // todo: run UID search to return if user is authorized before doing any screen changes.
  // also, forward user to a new page /QRCode or something

  return (
    <>
      {!pageLoaded && (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <CircularProgress />
        </Grid>
      )}
      {pageLoaded && (
        <>
          <WelcomeText />
          <Login />
        </>
      )}
    </>
  );
}

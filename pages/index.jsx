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
    if (!user) return;
    if (user.authorized) {
      console.log(user);
      Router.push("/Access");
    } else {
      setPageLoaded(true);
    }
  }, [user]);

  // todo: run UID search to return if user is authorized before doing any screen changes.
  // also, forward user to a new page /QRCode or something

  return (
    <>
      <Grid
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!pageLoaded && <CircularProgress />}
        {pageLoaded && !user && (
          <>
            <WelcomeText />
            <Login />
          </>
        )}
      </Grid>
    </>
  );
}

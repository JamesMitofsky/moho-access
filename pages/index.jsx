import CodeOfDay from "../components/CodeOfDay.jsx";
import WelcomeText from "../components/WelcomeText.jsx";

import { useState } from "react";

import Login from "../components/Login.jsx";
import SignOut from "../components/SignOut.jsx";
import { Grid } from "@mui/material";
import { useAppContext } from "../context/state";

export default function App() {
  const [pageLoaded, setPageLoaded] = useState(true);
  const user = useAppContext();
  if (user) {
    console.log(user, user.displayName);
  }

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
        {pageLoaded && user && (
          <>
            <CodeOfDay />
            <WelcomeText />
            <SignOut />
          </>
        )}

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

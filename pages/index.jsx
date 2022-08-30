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
  console.log(user);

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

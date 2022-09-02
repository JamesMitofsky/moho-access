import CodeOfDay from "../components/CodeOfDay";
import WelcomeText from "../components/WelcomeText";
import SignOut from "../components/SignOut";
import { Grid } from "@mui/material";
import { useState } from "react";
import Loading from "../components/Loading";
import getResidentCode from "../functions/getResidentCode";

export default function Code() {
  const [loaded, setLoaded] = useState(false);

  const code = getResidentCode();

  return (
    <>
      <Loading loaded={loaded} />
      <CodeOfDay loaded={loaded} setLoaded={setLoaded} incomingCode={code} />
      {loaded && (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <WelcomeText />
          <SignOut />
        </Grid>
      )}
    </>
  );
}

import CodeOfDay from "../components/CodeOfDay";
import WelcomeText from "../components/WelcomeText";
import { Grid } from "@mui/material";
import { useState } from "react";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

export default function Visit() {
  // TESTING
  const [loaded, setLoaded] = useState(true);
  const { query } = useRouter();
  const { guest } = query;

  return (
    <>
      {guest}
      <Loading loaded={loaded} />
      <CodeOfDay loaded={loaded} setLoaded={setLoaded} />
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
        </Grid>
      )}
    </>
  );
}

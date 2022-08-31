import CodeOfDay from "../components/CodeOfDay";
import WelcomeText from "../components/WelcomeText";
import SignOut from "../components/SignOut";
import { Grid } from "@mui/material";

export default function Access() {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CodeOfDay />
      <WelcomeText />
      <SignOut />
    </Grid>
  );
}

import MohoSVG from "./MohoSVG";
import { Typography } from "@mui/material";

export default function WelcomeText() {
  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontSize: 35, fontFamily: "'Antonio'" }}
        variant="h1"
      >
        BIENVENUE SUR
        <MohoSVG color={"#f16760"} height={58} />
        LOGIN
      </Typography>
    </>
  );
}

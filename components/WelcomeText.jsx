import MohoSVG from "./MohoSVG";
import { Typography } from "@mui/material";

export default function WelcomeText() {
  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontFamily: "'Antonio'" }}
        variant="h1"
      >
        BIENVENUE SUR
        <MohoSVG color={"#f16760"} height={65} />
        LOGIN
      </Typography>
    </>
  );
}

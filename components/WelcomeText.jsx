import MohoSVG from "./MohoSVG";
import { Typography } from "@mui/material";

export default function WelcomeText() {
  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h1">
        Bienvenue à<MohoSVG />
        Authentification
      </Typography>
    </>
  );
}

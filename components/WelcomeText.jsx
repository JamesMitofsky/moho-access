import MohoSVG from "./MohoSVG";
import { Typography } from "@mui/material";

export default function WelcomeText() {
  return (
    <>
      <Typography sx={{ textAlign: "center", fontWeight: 300 }} variant="h1">
        BIENVENUE A<MohoSVG color={"#f16760"} height={58} />
        LOGIN
      </Typography>
    </>
  );
}

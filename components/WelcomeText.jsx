import MohoSVG from "./MohoSVG";
import { Typography } from "@mui/material";

export default function WelcomeText() {
  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: 54.2,
          fontFamily: "'Antonio'",
          color: "#f16760",
          fontWeight: 500,
        }}
        variant="h1"
      >
        <MohoSVG color={"#f16760"} height={86} />
        ACCESS
      </Typography>
    </>
  );
}

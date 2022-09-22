import MohoSVG from "./MohoSVG";
import { Typography } from "@mui/material";

export default function WelcomeText() {
  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: 35,
          fontFamily: "'Antonio'",
          color: "#f16760",
          fontWeight: 500,
        }}
        variant="h1"
      >
        <MohoSVG color={"#f16760"} height={56} />
        ACCESS
      </Typography>
    </>
  );
}

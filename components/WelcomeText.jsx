import Image from "next/future/image";

import { Typography } from "@mui/material";
// import "../styles/welcomeText.css";
import logo from "../public/images/moho-logo.png";

export default function WelcomeText() {
  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h1">
        Bienvenue à{" "}
        <Image
          priority
          layout="intrinsic"
          className="mohoLogo"
          src={logo}
          alt="Moho's logo"
        />{" "}
        Authentification
      </Typography>
    </>
  );
}

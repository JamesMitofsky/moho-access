import { Typography } from "@mui/material";
import "../App.css";
import logo from "../assets/moho-logo.png";

export default function WelcomeText() {
  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h1">
        Bienvenue à <img className="mohoLogo" src={logo} alt="Moho Logo" />{" "}
        Authentification
      </Typography>
    </>
  );
}

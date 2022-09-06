import MohoModel from "../components/MohoModel";
import MarginProvider from "../components/layouts/MarginProvider";
import { Typography, Link, Button } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AboutPage() {
  return (
    <MarginProvider>
      <WelcomeText />

      <Link sx={{ display: "flex", alignItems: "center" }} href="/code">
        <ArrowBackIcon />
        Return to QR code
      </Link>
      <Typography variant="h1">Hi there, my name is James!</Typography>
      <Typography>
        Powered by React, Next.js, Firebase Auth, and and Cloud Firestore, this
        project was really interesting to work on. I&apos;ve been doing
        freelance development for 4 years, and now I&apos;m looking for a full
        time position.
      </Typography>
      <Link target="_blank" href="https://github.com/JamesMitofsky">
        <Button fullWidth variant="contained">
          Checkout my GitHub
        </Button>
      </Link>
      <MohoModel />
    </MarginProvider>
  );
}

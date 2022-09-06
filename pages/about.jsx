import MohoModel from "../components/MohoModel";
import MarginProvider from "../components/layouts/MarginProvider";
import { Typography, Link, Button } from "@mui/material";
import WelcomeText from "../components/WelcomeText";

export default function AboutPage() {
  return (
    <MarginProvider>
      <WelcomeText />
      <Link href="/code">Return to QR code</Link>
      <Typography variant="h1">Hi there, my name is James!</Typography>
      <Typography>
        Powered by React, Next.js, Firebase Auth, and and Cloud Firestore, this
        project was really interesting to work on. I've been doing freelance
        development for 4 years, and now I'm looking for a full time position.
      </Typography>
      <Link target="_blank" href="https://github.com/JamesMitofsky">
        <Button variant="contained">Visit my GitHub!</Button>
      </Link>
      <MohoModel />
    </MarginProvider>
  );
}

import MohoModel from "../components/MohoModel";
import MarginProvider from "../components/layouts/MarginProvider";
import { Typography, Link, Button, Box } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import portrait from "../public/images/portrait.jpeg";
import Image from "next/future/image";

export default function AboutPage() {
  return (
    <MarginProvider>
      <WelcomeText />

      <Link sx={{ display: "flex", alignItems: "center" }} href="/code">
        <ArrowBackIcon />
        Return to QR code
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Image
          style={{ width: 120, height: "auto", borderRadius: "50%" }}
          src={portrait}
          alt="Portrait of James Mitofsky"
        />
        <Typography variant="h1" sx={{ fontSize: 60, marginLeft: 3 }}>
          Hi there, I&apos;m James!
        </Typography>
      </Box>
      <MohoModel />
      <Typography>
        Moho Auth is written using React, Next.js, Firebase Auth, and Cloud
        Firestore. I&apos;ve been freelance developing for the last 4 years, and
        now I&apos;m looking to join a company. Feel free to get in touch!
      </Typography>
      <Link target="_blank" href="https://github.com/JamesMitofsky">
        <Button fullWidth variant="contained">
          Check out my GitHub
        </Button>
      </Link>
    </MarginProvider>
  );
}

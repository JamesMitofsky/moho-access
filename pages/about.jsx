import MohoModel from "../components/MohoModel";
import MarginProvider from "../components/layouts/MarginProvider";
import { Typography, Link, Button, Box } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import portrait from "../public/images/portrait.jpeg";
import Image from "next/future/image";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>

      <MarginProvider>
        <Link sx={{ display: "flex", alignItems: "center" }} href="/code">
          <ArrowBackIcon />
          QR code
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
            style={{ width: 90, height: "auto", borderRadius: "50%" }}
            src={portrait}
            alt="Portrait of James Mitofsky"
          />
          <Typography variant="h1" sx={{ fontSize: 35, marginLeft: 3 }}>
            Salut, je suis James!
          </Typography>
        </Box>
        <MohoModel />
        <Typography>
          🇺🇸 Moho Auth is written using React, Next.js, Firebase Auth, and Cloud
          Firestore. I've been freelance developing for the last 4 years, and
          now I'm looking to join a company. Feel free to get in touch!
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          🇫🇷 Moho Auth est écrit en utilisant React, Next.js, Firebase Auth et
          Cloud Firestore. J'etudie du code depuis 4 ans, et maintenant je
          cherche à rejoindre une entreprise. N’hésitez pas à entrer en contact!
        </Typography>
        <Link target="_blank" href="https://github.com/JamesMitofsky">
          <Button fullWidth variant="contained">
            Visiter mon GitHub!
          </Button>
        </Link>
      </MarginProvider>
    </>
  );
}

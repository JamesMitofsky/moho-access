import MohoModel from "../components/MohoModel";
import MarginProvider from "../components/layouts/MarginProvider";
import { Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <MarginProvider>
      <Typography variant="h1">Hi there, my name is James!</Typography>
      <Typography variant="h2">
        Programming is what I love, and I am looking for a full time job where I
        can contribute to something bigger.
      </Typography>
      <Typography variant="body1">
        This project is powered by React, Next.js, Firebase Auth, and and Cloud
        Firestore.
      </Typography>
      <MohoModel />
    </MarginProvider>
  );
}

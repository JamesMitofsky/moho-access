import MarginProvider from "../components/layouts/MarginProvider";
import { Typography, Box, Link } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import SignOut from "../components/SignOut";
import { useAppContext } from "../context/state";
import { useEffect, useState } from "react";

import Head from "next/head";

export default function AboutPage() {
  const user = useAppContext();
  const [fName, setFName] = useState(null);

  useEffect(() => {
    // don't run if user hasn't yet been assigned
    if (!user) return;
    const fullName = user?.displayName || "";
    const firstName = fullName.split(" ")[0];
    setFName(firstName);
  }, [user]);

  return (
    <>
      <Head>
        <title>Bienvenue à Moho Auth</title>
      </Head>

      <MarginProvider>
        <WelcomeText />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          <Typography variant="h1" sx={{ fontSize: 50 }}>
            Salut{fName && `, ${fName}`}! 👋
          </Typography>
        </Box>
        <Typography>
          C'est parti! Merci de vous être inscrit auprès de Moho Auth! Si vous
          êtes résident, contactez votre contact chez Moho ou{" "}
          <Link target="_blank" href="mailto:jamesmitofsky@gmail.com">
            James
          </Link>{" "}
          pour approuver vos identifiants de compte.
        </Typography>
        <SignOut />
      </MarginProvider>
    </>
  );
}

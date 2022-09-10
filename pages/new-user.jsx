import MarginProvider from "../components/layouts/MarginProvider";
import { Typography, Box } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import SignOut from "../components/SignOut";
import { useAppContext } from "../context/state";
import { useEffect, useState } from "react";

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
          Hi there{fName && `, ${fName}`}!
        </Typography>
      </Box>
      <Typography>
        Thanks for registering with Moho Auth! If you are a resident, ask your
        contact at Moho to approve your account with credentials.
      </Typography>
      <SignOut />
    </MarginProvider>
  );
}

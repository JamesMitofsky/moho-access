import MarginProvider from "../components/layouts/MarginProvider";
import { Typography, Box } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import SignOut from "../components/SignOut";

export default function AboutPage() {
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
          Hi there!
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

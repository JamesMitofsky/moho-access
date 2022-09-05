import MohoModel from "../components/MohoModel";
import WelcomeText from "../components/WelcomeText";
import { Button, Link, Box } from "@mui/material";

export default function App() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <WelcomeText />
        <Link to="/auth">
          <Button variant="contained">Login / Register</Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          marginTop: 3,
        }}
      >
        <MohoModel />
      </Box>
    </>
  );
}

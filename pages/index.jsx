import MohoModel from "../components/MohoModel";
import WelcomeText from "../components/WelcomeText";
import { Box } from "@mui/material";

export default function App() {
  return (
    <>
      <WelcomeText />
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

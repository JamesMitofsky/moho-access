import { Box, Typography, Link, Button } from "@mui/material";
import { useAppContext } from "../context/state";

const Footer = () => {
  const user = useAppContext();
  const isAdmin = user?.authorized;
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      {isAdmin && (
        <Button sx={{ mb: 2 }} variant="contained" fullWidth href="/admin">
          Admin Controls
        </Button>
      )}
      <Typography sx={{ fontSize: 15 }}>
        <Link href="/about">Powered by ☕️ and James Mitofsky 🌱</Link>
      </Typography>
    </Box>
  );
};

export default Footer;

import { Box, Typography, Link } from "@mui/material";
import { useAppContext } from "../context/state";

const Footer = () => {
  const user = useAppContext();
  const isAdmin = user?.authorized;
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Typography sx={{ fontSize: 15 }}>
        <Link target="_blank" href="https://github.com/JamesMitofsky">
          Powered by ☕️ and James Mitofsky 🌱
        </Link>
        {isAdmin && (
          <>
            <Link sx={{ marginLeft: 5 }} href="/admin">
              Admin Menu
            </Link>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default Footer;

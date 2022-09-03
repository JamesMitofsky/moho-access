import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Link target="_blank" href="https://github.com/JamesMitofsky">
        <Typography variant="subtitle1">
          Powered by ☕️ and James Mitofsky 🌱
        </Typography>
      </Link>
    </Box>
  );
};

export default Footer;

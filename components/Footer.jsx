import { Box } from "@mui/material";

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
      Powered by ☕️ and James Mitofsky 🤙
    </Box>
  );
};

export default Footer;

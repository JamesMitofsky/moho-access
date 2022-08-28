import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: 0.5,
        margin: 2,
      }}
    >
      Powered by ☕️ and James Mitofsky 🤙
    </Box>
  );
};

export default Footer;

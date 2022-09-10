import { Box, Typography, Link, Button } from "@mui/material";
import { useAppContext } from "../context/state";
import { useRouter } from "next/router";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Footer = () => {
  const user = useAppContext();
  const isAdmin = user?.roles.admin === true;

  const router = useRouter();
  const pathName = router.pathname;

  const isAdminView = pathName.includes("admin");
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
      {isAdmin && !isAdminView && (
        <Button
          startIcon={<AdminPanelSettingsIcon />}
          sx={{ mb: 2 }}
          variant="contained"
          fullWidth
          href="/admin"
        >
          Admin Controls
        </Button>
      )}
      <Typography sx={{ fontSize: 15, mb: 2.5, mt: 2.5 }}>
        <Link href="/about">Powered by ☕️ and James Mitofsky 🌱</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
